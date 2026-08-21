import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Card3DWidget = ({ type = 'trophy', color = '#38bdf8', secondaryColor = '#fbbf24', className = 'w-12 h-12' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 48;
    const height = container.clientHeight || 48;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting (Key, Fill, Rim & Specular)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(new THREE.Color(color), 3.0, 10);
    pointLight.position.set(-2, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(new THREE.Color(secondaryColor), 2.5, 10);
    pointLight2.position.set(2, -2, 2);
    scene.add(pointLight2);

    // 4. Geometry Group
    const group = new THREE.Group();
    scene.add(group);

    let meshesToAnimate = [];

    // Helper: Create 5-point 2D Star shape for ExtrudeGeometry
    const createStarShape = (radiusOuter = 1.0, radiusInner = 0.45, points = 5) => {
      const shape = new THREE.Shape();
      const step = Math.PI / points;
      for (let i = 0; i < 2 * points; i++) {
        const r = (i % 2 === 0) ? radiusOuter : radiusInner;
        const angle = i * step - Math.PI / 2;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      return shape;
    };

    if (type === 'trophy' || type === 'trophy3d') {
      // 🏆 Realistic 3D Championship Gold Trophy
      const trophyGroup = new THREE.Group();

      const metalMat = new THREE.MeshPhysicalMaterial({
        color: 0xffcf40,
        emissive: 0x92400e,
        emissiveIntensity: 0.32,
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
      });

      const darkBaseMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        metalness: 0.4,
        roughness: 0.22,
        clearcoat: 0.9,
      });

      const goldPlaqueMat = new THREE.MeshStandardMaterial({
        color: 0xffe082,
        emissive: 0xd97706,
        emissiveIntensity: 0.35,
        metalness: 0.92,
        roughness: 0.2,
      });

      // 1. Turned Chalice Cup Body (Seamless Lathe Geometry)
      const cupPoints = [
        new THREE.Vector2(0.00, 0.00),
        new THREE.Vector2(0.18, 0.00),
        new THREE.Vector2(0.20, 0.06),
        new THREE.Vector2(0.30, 0.12),
        new THREE.Vector2(0.44, 0.26),
        new THREE.Vector2(0.52, 0.42),
        new THREE.Vector2(0.50, 0.60),
        new THREE.Vector2(0.56, 0.74),
        new THREE.Vector2(0.64, 0.86),
        new THREE.Vector2(0.60, 0.89),
        new THREE.Vector2(0.55, 0.87),
        new THREE.Vector2(0.48, 0.72),
        new THREE.Vector2(0.38, 0.50),
        new THREE.Vector2(0.24, 0.28),
        new THREE.Vector2(0.00, 0.22),
      ];
      const cup = new THREE.Mesh(new THREE.LatheGeometry(cupPoints, 36), metalMat);
      cup.position.y = 0.08;
      trophyGroup.add(cup);

      // 2. Fluted Stem with Knop
      const stemPoints = [
        new THREE.Vector2(0.00, 0.08),
        new THREE.Vector2(0.16, 0.08),
        new THREE.Vector2(0.10, 0.01),
        new THREE.Vector2(0.18, -0.07),
        new THREE.Vector2(0.10, -0.15),
        new THREE.Vector2(0.22, -0.22),
        new THREE.Vector2(0.36, -0.30),
        new THREE.Vector2(0.38, -0.33),
        new THREE.Vector2(0.00, -0.33),
      ];
      const stem = new THREE.Mesh(new THREE.LatheGeometry(stemPoints, 32), metalMat);
      trophyGroup.add(stem);

      // 3. Multi-tier Pedestal
      const goldRing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.06, 32), metalMat);
      goldRing.position.y = -0.35;
      trophyGroup.add(goldRing);

      const plinthUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.62, 0.22, 8), darkBaseMat);
      plinthUpper.position.y = -0.48;
      plinthUpper.rotation.y = Math.PI / 8;
      trophyGroup.add(plinthUpper);

      const plinthLower = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.72, 0.12, 8), darkBaseMat);
      plinthLower.position.y = -0.62;
      plinthLower.rotation.y = Math.PI / 8;
      trophyGroup.add(plinthLower);

      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.10, 0.03), goldPlaqueMat);
      plaque.position.set(0, -0.48, 0.58);
      trophyGroup.add(plaque);

      // 4. Majestic Catmull-Rom Ribbon Handles
      const handleCurveL = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.50, 0.80, 0),
        new THREE.Vector3(-0.74, 0.86, 0.02),
        new THREE.Vector3(-0.90, 0.68, 0),
        new THREE.Vector3(-0.92, 0.44, 0),
        new THREE.Vector3(-0.74, 0.22, 0),
        new THREE.Vector3(-0.36, 0.18, 0),
      ]);
      const handleMeshL = new THREE.Mesh(new THREE.TubeGeometry(handleCurveL, 32, 0.048, 12, false), metalMat);
      trophyGroup.add(handleMeshL);

      const handleCurveR = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.50, 0.80, 0),
        new THREE.Vector3(0.74, 0.86, 0.02),
        new THREE.Vector3(0.90, 0.68, 0),
        new THREE.Vector3(0.92, 0.44, 0),
        new THREE.Vector3(0.74, 0.22, 0),
        new THREE.Vector3(0.36, 0.18, 0),
      ]);
      const handleMeshR = new THREE.Mesh(new THREE.TubeGeometry(handleCurveR, 32, 0.048, 12, false), metalMat);
      trophyGroup.add(handleMeshR);

      // 5. Crown Star Inside Chalice
      const starCrown = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.16, 0),
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.6,
          metalness: 0.1,
          roughness: 0.05,
        })
      );
      starCrown.position.set(0, 0.65, 0);
      trophyGroup.add(starCrown);

      trophyGroup.scale.set(0.75, 0.75, 0.75);
      group.add(trophyGroup);
      meshesToAnimate.push(trophyGroup);
    } else if (type === 'code' || type === 'code3d') {
      // 💻 3D Code Bracket Matrix
      const codeGroup = new THREE.Group();

      const bracketMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
        metalness: 0.7,
        roughness: 0.2,
      });

      const badgeMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x1e293b,
        emissiveIntensity: 0.3,
        metalness: 0.4,
        roughness: 0.4,
      });

      // Beveled rounded square badge
      const badgeGeo = new THREE.BoxGeometry(1.4, 1.4, 0.25);
      const badge = new THREE.Mesh(badgeGeo, badgeMat);
      codeGroup.add(badge);

      // Left Bracket '<'
      const armGeo = new THREE.BoxGeometry(0.08, 0.45, 0.1);
      const bL1 = new THREE.Mesh(armGeo, bracketMat);
      bL1.rotation.z = Math.PI / 4;
      bL1.position.set(-0.36, 0.14, 0.16);
      codeGroup.add(bL1);

      const bL2 = new THREE.Mesh(armGeo, bracketMat);
      bL2.rotation.z = -Math.PI / 4;
      bL2.position.set(-0.36, -0.14, 0.16);
      codeGroup.add(bL2);

      // Slash '/'
      const slashGeo = new THREE.BoxGeometry(0.08, 0.75, 0.1);
      const slash = new THREE.Mesh(slashGeo, bracketMat);
      slash.rotation.z = -Math.PI / 8;
      slash.position.set(0, 0, 0.16);
      codeGroup.add(slash);

      // Right Bracket '>'
      const bR1 = new THREE.Mesh(armGeo, bracketMat);
      bR1.rotation.z = -Math.PI / 4;
      bR1.position.set(0.36, 0.14, 0.16);
      codeGroup.add(bR1);

      const bR2 = new THREE.Mesh(armGeo, bracketMat);
      bR2.rotation.z = Math.PI / 4;
      bR2.position.set(0.36, -0.14, 0.16);
      codeGroup.add(bR2);

      group.add(codeGroup);
      meshesToAnimate.push(codeGroup);
    } else if (type === 'clock' || type === 'clock3d' || type === 'chrono') {
      // ⏱️ 3D Chrono Stopwatch / Clock
      const clockGroup = new THREE.Group();

      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x9333ea,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      });

      const faceMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.1,
        roughness: 0.3,
      });

      const handMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        metalness: 0.9,
        roughness: 0.1,
      });

      // Outer Bezel Ring
      const bezelGeo = new THREE.TorusGeometry(0.85, 0.16, 16, 36);
      const bezel = new THREE.Mesh(bezelGeo, ringMat);
      clockGroup.add(bezel);

      // Dial Face
      const dialGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.1, 32);
      dialGeo.rotateX(Math.PI / 2);
      const dial = new THREE.Mesh(dialGeo, faceMat);
      dial.position.z = -0.04;
      clockGroup.add(dial);

      // Top Button
      const btnGeo = new THREE.BoxGeometry(0.2, 0.15, 0.15);
      const btn = new THREE.Mesh(btnGeo, ringMat);
      btn.position.set(0, 0.95, 0);
      clockGroup.add(btn);

      // Minute Hand
      const mHandGeo = new THREE.BoxGeometry(0.06, 0.45, 0.04);
      const mHand = new THREE.Mesh(mHandGeo, handMat);
      mHand.position.set(0, 0.18, 0.05);
      clockGroup.add(mHand);

      // Hour Hand
      const hHandGeo = new THREE.BoxGeometry(0.32, 0.06, 0.04);
      const hHand = new THREE.Mesh(hHandGeo, handMat);
      hHand.position.set(0.12, 0, 0.05);
      clockGroup.add(hHand);

      group.add(clockGroup);
      meshesToAnimate.push(clockGroup);
    } else if (type === 'star' || type === 'star3d') {
      // ⭐ 3D Extruded Golden Star
      const starGroup = new THREE.Group();

      const starShape = createStarShape(0.95, 0.45, 5);
      const extrudeSettings = {
        depth: 0.28,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.08,
      };

      const starGeo = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
      starGeo.center();

      const starMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xd97706,
        emissiveIntensity: 0.55,
        metalness: 0.88,
        roughness: 0.15,
      });

      const starMesh = new THREE.Mesh(starGeo, starMat);
      starGroup.add(starMesh);

      group.add(starGroup);
      meshesToAnimate.push(starGroup);
    }

    // 5. Interactive Mouse Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.2;
      targetY = y * 2.2;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);

    // 6. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      group.rotation.y = Math.sin(elapsedTime * 1.2) * 0.25 + mouseX;
      group.rotation.x = Math.cos(elapsedTime * 1.0) * 0.15 + mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });
    };
  }, [type, color, secondaryColor]);

  return (
    <div
      ref={mountRef}
      className={`shrink-0 flex items-center justify-center overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
      aria-hidden="true"
    />
  );
};

export default Card3DWidget;
