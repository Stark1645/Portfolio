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
    const particleCount = isMobile ? 110 : 240;

    // 1. Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    // 2. High-Performance Alpha WebGL Renderer
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 3. Coordinate, Color & Floating Motion Arrays
    const startPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const floatPhases = new Float32Array(particleCount);
    const floatSpeeds = new Float32Array(particleCount);
    const floatRadii = new Float32Array(particleCount);

    // Vibrant Luminous Palette
    const palette = [
      [0.0, 0.95, 1.0],   // Bright Cyan
      [0.2, 0.75, 1.0],   // Azure Neon
      [0.55, 0.6, 1.0],   // Electric Indigo
      [1.0, 1.0, 1.0],    // Pure White Spark
      [0.38, 0.9, 1.0],   // Sky Glow
    ];

    const targetRadius = isMobile ? 4.3 : 5.05;
    const ringCount = Math.floor(particleCount * 0.4); // 40% form profile halo, 60% free-flowing background

    for (let i = 0; i < particleCount; i++) {
      let tx, ty, tz;
      let sx, sy, sz;

      floatPhases[i] = Math.random() * Math.PI * 2;
      // Gentle floating speed
      floatSpeeds[i] = 0.12 + Math.random() * 0.22;
      floatRadii[i] = 0.4 + Math.random() * 0.8;

      if (i < ringCount) {
        // ── PROFILE CIRCLE CONVERGENCE ──
        const angle = (i / ringCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.05;
        const rad = targetRadius + (Math.random() - 0.5) * 0.35;
        tx = Math.cos(angle) * rad;
        ty = Math.sin(angle) * rad + 0.35;
        tz = (Math.random() - 0.5) * 0.5 - 1.0;

        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterDist = 7.0 + Math.random() * 12.0;
        sx = Math.cos(scatterAngle) * scatterDist + (Math.random() - 0.5) * 6.0;
        sy = Math.sin(scatterAngle) * scatterDist + (Math.random() - 0.5) * 5.0;
        sz = tz;
      } else {
        // ── GLOBAL FREE-FLOWING BACKGROUND PARTICLES (Broad coverage across viewport) ──
        tx = (Math.random() - 0.5) * 44;
        ty = (Math.random() - 0.5) * 28;
        tz = (Math.random() - 0.5) * 12 - 2;

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

      // Soft, balanced brightness
      const c = palette[Math.floor(Math.random() * palette.length)];
      const dimFactor = 0.5 + Math.random() * 0.35;
      colors[i * 3] = c[0] * dimFactor;
      colors[i * 3 + 1] = c[1] * dimFactor;
      colors[i * 3 + 2] = c[2] * dimFactor;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Clear, glowing circular particle sprite texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.25, 'rgba(0, 240, 255, 0.75)');
      grad.addColorStop(0.55, 'rgba(56, 189, 248, 0.3)');
      grad.addColorStop(0.8, 'rgba(129, 140, 248, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(particleCanvas);

    // Visible, delicate particle sizing with soft opacity
    const baseSize = isMobile ? 0.48 : 0.62;
    const material = new THREE.PointsMaterial({
      size: baseSize,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.52, // Soft, non-intrusive opacity
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    // Mouse & Scroll Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      const heroHeight = window.innerHeight || 800;
      targetScrollProgress = Math.min(Math.max(window.scrollY / heroHeight, 0), 2.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

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

      // Circle assembly (0ms -> 1100ms)
      const p = Math.min(elapsed / 1100, 1.0);
      const ease = 1 - Math.pow(1 - p, 3);

      // Smooth scroll lerp
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.05;

      // Camera depth response across entire home page scroll
      camera.position.z = 24 - currentScrollProgress * 8;
      camera.position.y = -currentScrollProgress * 2.0;

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        // Slow, gentle floating movement
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

      // Subtle mouse parallax & drift
      currentMouseX += (targetMouseX - currentMouseX) * 0.02;
      currentMouseY += (targetMouseY - currentMouseY) * 0.02;

      group.rotation.y = timeSec * 0.002 + currentMouseX * 0.02;
      group.rotation.x = -currentScrollProgress * 0.12 + Math.sin(timeSec * 0.05) * 0.004 + currentMouseY * 0.015;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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
      className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default Hero3DCanvas;
