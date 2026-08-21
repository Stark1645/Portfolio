import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DCanvas = ({ className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const particleCount = isMobile ? 40 : 100;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    // 2. Renderer with High Performance & Alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      precision: 'lowp',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Elements Group
    const group = new THREE.Group();
    scene.add(group);

    // 4. Lightweight BufferGeometry Particles (80-100 on desktop, 40 on mobile)
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanR = 0.22, cyanG = 0.74, cyanB = 0.97;
    const amberR = 0.98, amberG = 0.75, amberB = 0.14;
    const indigoR = 0.51, indigoG = 0.55, indigoB = 0.97;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const rand = Math.random();
      if (rand < 0.55) {
        colors[i * 3] = cyanR;
        colors[i * 3 + 1] = cyanG;
        colors[i * 3 + 2] = cyanB;
      } else if (rand < 0.8) {
        colors[i * 3] = indigoR;
        colors[i * 3 + 1] = indigoG;
        colors[i * 3 + 2] = indigoB;
      } else {
        colors[i * 3] = amberR;
        colors[i * 3 + 1] = amberG;
        colors[i * 3 + 2] = amberB;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Simple circular particle texture (created once)
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.7)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.42,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0, // Starts at 0 for 0-300ms
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    // Initial scale for outward activation drift
    group.scale.set(0.88, 0.88, 0.88);

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

      // ── WEBGL LOAD ANIMATION (0-1200ms) ──
      // 0-300ms: opacity ≈ 0
      // 300-800ms: reveal particle field (opacity 0 -> 0.65, drift outward 0.88 -> 1.0)
      // 800-1200ms: settles into final state
      if (elapsed < 300) {
        material.opacity = 0;
      } else if (elapsed < 800) {
        const p = (elapsed - 300) / 500;
        const ease = 1 - Math.pow(1 - p, 3);
        material.opacity = ease * 0.65;
        const scale = 0.88 + ease * 0.12;
        group.scale.set(scale, scale, scale);
      } else if (elapsed < 1200) {
        material.opacity = 0.65;
        group.scale.set(1.0, 1.0, 1.0);
      } else {
        material.opacity = 0.65;
      }

      // Single transform ambient drift (ultra-lightweight, 0 allocations)
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const timeSec = elapsed * 0.001;
      group.rotation.y = timeSec * 0.012 + currentMouseX * 0.08;
      group.rotation.x = Math.sin(timeSec * 0.2) * 0.02 + currentMouseY * 0.05;

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
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default Hero3DCanvas;
