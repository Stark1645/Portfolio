import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Events3DCanvas = ({ className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 22 : 18);

    // 2. WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 40);
    cyanLight.position.set(-10, 8, 12);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.0, 40);
    purpleLight.position.set(10, -8, 10);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 30);
    blueLight.position.set(0, 0, 8);
    scene.add(blueLight);

    const group = new THREE.Group();
    scene.add(group);

    // 4. Floating 3D Geometric Holograms / Memory Crystals
    const crystalConfigs = [
      { geom: new THREE.IcosahedronGeometry(1.4, 0), pos: [-8, 6, -3], rotSpeed: [0.008, 0.012, 0.005], color: 0x38bdf8 },
      { geom: new THREE.OctahedronGeometry(1.2, 0), pos: [9, 5, -2], rotSpeed: [-0.01, 0.009, 0.007], color: 0x818cf8 },
      { geom: new THREE.DodecahedronGeometry(1.1, 0), pos: [-9, -6, -4], rotSpeed: [0.007, -0.011, 0.006], color: 0xa855f7 },
      { geom: new THREE.TorusGeometry(1.0, 0.35, 16, 32), pos: [8.5, -5.5, -3], rotSpeed: [0.012, 0.008, -0.009], color: 0x38bdf8 },
      { geom: new THREE.TetrahedronGeometry(0.9, 0), pos: [0, 9, -5], rotSpeed: [0.009, 0.014, 0.004], color: 0x60a5fa },
    ];

    const crystalMeshes = [];

    crystalConfigs.forEach((cfg) => {
      const meshGroup = new THREE.Group();
      meshGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

      // Inner semi-transparent crystal body
      const solidMat = new THREE.MeshPhongMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.18,
        shininess: 90,
        wireframe: false,
        side: THREE.DoubleSide,
      });
      const solidMesh = new THREE.Mesh(cfg.geom, solidMat);
      meshGroup.add(solidMesh);

      // Outer wireframe glowing cage
      const wireMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const wireMesh = new THREE.Mesh(cfg.geom, wireMat);
      wireMesh.scale.set(1.03, 1.03, 1.03);
      meshGroup.add(wireMesh);

      group.add(meshGroup);
      crystalMeshes.push({
        group: meshGroup,
        basePos: [...cfg.pos],
        rotSpeed: cfg.rotSpeed,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // 5. Constellation Particles & Connecting Dynamic Lines
    const particleCount = isMobile ? 26 : 48;
    const maxDistance = isMobile ? 4.5 : 5.8;
    const maxDistSq = maxDistance * maxDistance;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * (isMobile ? 24 : 36);
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 10 - 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.018,
        y: (Math.random() - 0.5) * 0.018,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Glowing Particle Texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.65 : 0.85,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // Line segments connecting close particles
    const maxConnections = particleCount * 6;
    const linePositions = new Float32Array(maxConnections * 3 * 2);
    const lineColors = new Float32Array(maxConnections * 3 * 2);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // 6. Interactive Mouse & Scroll Parallax Tracking
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

    // 7. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      group.rotation.y = currentMouseX * 0.08 + Math.sin(elapsedTime * 0.15) * 0.04;
      group.rotation.x = -currentMouseY * 0.06 + Math.cos(elapsedTime * 0.15) * 0.03;

      // Animate floating crystals
      crystalMeshes.forEach((c) => {
        c.group.rotation.x += c.rotSpeed[0];
        c.group.rotation.y += c.rotSpeed[1];
        c.group.rotation.z += c.rotSpeed[2];
        c.group.position.y = c.basePos[1] + Math.sin(elapsedTime * 1.2 + c.phase) * 0.6;
        c.group.position.x = c.basePos[0] + Math.cos(elapsedTime * 0.8 + c.phase) * 0.3;
      });

      // Update particle positions
      const pPos = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3] += velocities[i].x;
        pPos[i * 3 + 1] += velocities[i].y;
        pPos[i * 3 + 2] += velocities[i].z;

        const boundX = isMobile ? 13 : 20;
        const boundY = 12;
        if (pPos[i * 3] < -boundX || pPos[i * 3] > boundX) velocities[i].x *= -1;
        if (pPos[i * 3 + 1] < -boundY || pPos[i * 3 + 1] > boundY) velocities[i].y *= -1;
        if (pPos[i * 3 + 2] < -7 || pPos[i * 3 + 2] > 4) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update line connections
      let lineIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pPos[i * 3] - pPos[j * 3];
          const dy = pPos[i * 3 + 1] - pPos[j * 3 + 1];
          const dz = pPos[i * 3 + 2] - pPos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq && lineIndex < maxConnections * 6) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / maxDistance;

            linePositions[lineIndex++] = pPos[i * 3];
            linePositions[lineIndex++] = pPos[i * 3 + 1];
            linePositions[lineIndex++] = pPos[i * 3 + 2];

            linePositions[lineIndex++] = pPos[j * 3];
            linePositions[lineIndex++] = pPos[j * 3 + 1];
            linePositions[lineIndex++] = pPos[j * 3 + 2];

            const r = 0.22 + 0.4 * alpha;
            const g = 0.65 + 0.3 * alpha;
            const b = 0.98;

            lineColors[colorIndex++] = r * alpha;
            lineColors[colorIndex++] = g * alpha;
            lineColors[colorIndex++] = b * alpha;

            lineColors[colorIndex++] = r * alpha;
            lineColors[colorIndex++] = g * alpha;
            lineColors[colorIndex++] = b * alpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      crystalConfigs.forEach((c) => c.geom.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

export default Events3DCanvas;
