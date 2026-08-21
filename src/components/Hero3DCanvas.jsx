import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DCanvas = ({ className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const particleCount = isMobile ? 80 : 180;

    // 1. Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    // 2. High-Performance Alpha WebGL Renderer (100% transparent, background layer)
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        precision: 'lowp',
      });
    } catch (e) {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 3. Mathematical Coordinate & Float State Arrays
    const startPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const floatPhases = new Float32Array(particleCount);
    const floatSpeeds = new Float32Array(particleCount);
    const floatRadii = new Float32Array(particleCount);

    // Subtle, low-opacity cosmic color palette with soft tint
    const palette = [
      [0.0, 0.85, 0.95],  // Soft Cyan
      [0.2, 0.65, 0.9],   // Soft Sky Blue
      [0.45, 0.5, 0.9],   // Soft Indigo
      [0.85, 0.92, 1.0],  // Soft White Spark
    ];

    const targetRadius = isMobile ? 4.3 : 5.05;
    const ringCount = Math.floor(particleCount * 0.45); // 45% form profile circle, 55% free flowing background

    for (let i = 0; i < particleCount; i++) {
      let tx, ty, tz;
      let sx, sy, sz;

      floatPhases[i] = Math.random() * Math.PI * 2;
      // Slow, graceful drift speed
      floatSpeeds[i] = 0.25 + Math.random() * 0.45;
      floatRadii[i] = 0.3 + Math.random() * 0.7;

      if (i < ringCount) {
        // ── PROFILE CIRCLE CONVERGENCE ──
        const angle = (i / ringCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.05;
        const rad = targetRadius + (Math.random() - 0.5) * 0.35;
        tx = Math.cos(angle) * rad;
        ty = Math.sin(angle) * rad + 0.35;
        tz = (Math.random() - 0.5) * 0.5 - 1.0;

        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterDist = 7.0 + Math.random() * 10.0;
        sx = Math.cos(scatterAngle) * scatterDist + (Math.random() - 0.5) * 6.0;
        sy = Math.sin(scatterAngle) * scatterDist + (Math.random() - 0.5) * 5.0;
        sz = tz;
      } else {
        // ── FREE-FLOWING BACKGROUND PARTICLES (Spread broadly across hero) ──
        tx = (Math.random() - 0.5) * 40;
        ty = (Math.random() - 0.5) * 24;
        tz = (Math.random() - 0.5) * 8 - 2; // Deep in background

        sx = tx + (Math.random() - 0.5) * 5.0;
        sy = ty + (Math.random() - 0.5) * 5.0;
        sz = tz;
      }

      targetPositions[i * 3] = tx;
      targetPositions[i * 3 + 1] = ty;
      targetPositions[i * 3 + 2] = tz;

      startPositions[i * 3] = sx;
      startPositions[i * 3 + 1] = sy;
      startPositions[i * 3 + 2] = sz;

      currentPositions[i * 3] = sx;
      currentPositions[i * 3 + 1] = sy;
      currentPositions[i * 3 + 2] = sz;

      // Soft varied brightness for depth
      const c = palette[Math.floor(Math.random() * palette.length)];
      const dimFactor = 0.55 + Math.random() * 0.45; // Subtle varied brightness
      colors[i * 3] = c[0] * dimFactor;
      colors[i * 3 + 1] = c[1] * dimFactor;
      colors[i * 3 + 2] = c[2] * dimFactor;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft, diffused circular particle texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.2, 'rgba(0, 240, 255, 0.7)');
      grad.addColorStop(0.55, 'rgba(56, 189, 248, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(particleCanvas);

    const baseSize = isMobile ? 0.38 : 0.46;
    const material = new THREE.PointsMaterial({
      size: baseSize,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5, // Soft, non-intrusive background opacity
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = currentTime - startTime;
      const timeSec = elapsed * 0.001;

      // Circle assembly (0ms -> 800ms)
      const p = Math.min(elapsed / 800, 1.0);
      const ease = 1 - Math.pow(1 - p, 3); // Smooth cubic ease-out

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        // Slow, gentle undulating floating movement
        const fSpeed = floatSpeeds[i];
        const fPhase = floatPhases[i];
        const fRadius = floatRadii[i];

        const floatX = Math.sin(timeSec * fSpeed + fPhase) * fRadius;
        const floatY = Math.cos(timeSec * fSpeed * 0.85 + fPhase * 1.2) * fRadius;
        const floatZ = Math.sin(timeSec * fSpeed * 0.5 + fPhase) * (fRadius * 0.4);

        const baseX = startPositions[idx] + (targetPositions[idx] - startPositions[idx]) * ease;
        const baseY = startPositions[idx + 1] + (targetPositions[idx + 1] - startPositions[idx + 1]) * ease;
        const baseZ = startPositions[idx + 2] + (targetPositions[idx + 2] - startPositions[idx + 2]) * ease;

        pos[idx] = baseX + floatX;
        pos[idx + 1] = baseY + floatY;
        pos[idx + 2] = baseZ + floatZ;
      }
      geometry.attributes.position.needsUpdate = true;

      // Gentle parallax and very slow celestial drift
      currentMouseX += (targetMouseX - currentMouseX) * 0.025;
      currentMouseY += (targetMouseY - currentMouseY) * 0.025;

      group.rotation.y = timeSec * 0.003 + currentMouseX * 0.025;
      group.rotation.x = Math.sin(timeSec * 0.06) * 0.005 + currentMouseY * 0.018;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

export default Hero3DCanvas;
