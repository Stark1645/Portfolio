import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EventsCamera3D = ({ className = 'w-16 h-16' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 64;
    const height = container.clientHeight || 64;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Studio Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa855f7, 3.0, 10);
    rimLight.position.set(-3, -3, 2);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    // Camera body (rounded cuboid)
    const bodyGeom = new THREE.BoxGeometry(2.0, 1.3, 0.9);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
    group.add(bodyMesh);

    // Outer cyber glowing wireframe on camera
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const bodyWire = new THREE.Mesh(bodyGeom, wireMat);
    bodyWire.scale.set(1.02, 1.02, 1.02);
    group.add(bodyWire);

    // Camera lens cylinder
    const lensGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.6, 32);
    lensGeom.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.1,
    });
    const lensMesh = new THREE.Mesh(lensGeom, lensMat);
    lensMesh.position.set(0, 0, 0.5);
    group.add(lensMesh);

    // Lens Glowing Core Eye (Aperture)
    const coreGeom = new THREE.CircleGeometry(0.42, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreMesh.position.set(0, 0, 0.81);
    group.add(coreMesh);

    // Lens Ring (Torus)
    const torusGeom = new THREE.TorusGeometry(0.55, 0.06, 16, 32);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(torusGeom, torusMat);
    ringMesh.position.set(0, 0, 0.8);
    group.add(ringMesh);

    // Flash module
    const flashGeom = new THREE.BoxGeometry(0.35, 0.2, 0.2);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const flashMesh = new THREE.Mesh(flashGeom, flashMat);
    flashMesh.position.set(0.65, 0.45, 0.45);
    group.add(flashMesh);

    // Shutter button cylinder
    const buttonGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.2, 16);
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5 });
    const buttonMesh = new THREE.Mesh(buttonGeom, buttonMat);
    buttonMesh.position.set(-0.65, 0.72, 0);
    group.add(buttonMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      group.rotation.y = Math.sin(t * 1.5) * 0.35 + mouseX * 0.75;
      group.rotation.x = Math.cos(t * 1.2) * 0.15 - mouseY * 0.55;
      group.position.y = Math.sin(t * 2.0) * 0.12;

      ringMesh.rotation.z = t * 2.0;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeom.dispose();
      bodyMat.dispose();
      wireMat.dispose();
      lensGeom.dispose();
      lensMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      flashGeom.dispose();
      flashMat.dispose();
      buttonGeom.dispose();
      buttonMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`relative flex-shrink-0 cursor-pointer ${className}`} />;
};

export default EventsCamera3D;
