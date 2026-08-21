import { useEffect, useRef } from 'react';

const SiriMobiusOrb = ({ className = 'w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[510px] md:h-[510px] lg:w-[560px] lg:h-[560px]' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 550;
      height = canvas.height = canvas.parentElement.clientHeight || 550;
    };

    window.addEventListener('resize', handleResize);

    // Mouse Tracking for dynamic lean
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);

    let time = 0;

    // High-Vibrancy Apple Siri Ribbon Layers
    const ribbons = [
      // 1. Radiant Magenta / Hot Pink Wing (Top-Right Loop)
      {
        points: 70,
        colorStart: 'rgba(255, 0, 128, 1)',
        colorMid: 'rgba(236, 72, 153, 1)',
        colorEnd: 'rgba(168, 85, 247, 0.8)',
        speed: 1.2,
        freq: 2.0,
        phase: 0,
        tilt: 0.35,
        scaleX: 0.46,
        scaleY: 0.44,
        rotSpeed: 0.01,
      },
      // 2. Electric Cyan / Sky Blue Wing (Left-Bottom Loop)
      {
        points: 70,
        colorStart: 'rgba(0, 240, 255, 1)',
        colorMid: 'rgba(56, 189, 248, 1)',
        colorEnd: 'rgba(59, 130, 246, 0.8)',
        speed: 1.05,
        freq: 2.0,
        phase: Math.PI * 0.7,
        tilt: -0.45,
        scaleX: 0.47,
        scaleY: 0.43,
        rotSpeed: -0.009,
      },
      // 3. Ethereal Sky & Indigo Wing (Diagonal Flow)
      {
        points: 70,
        colorStart: 'rgba(56, 189, 248, 1)',
        colorMid: 'rgba(129, 140, 248, 1)',
        colorEnd: 'rgba(168, 85, 247, 0.8)',
        speed: 1.35,
        freq: 2.4,
        phase: Math.PI * 1.35,
        tilt: 0.25,
        scaleX: 0.44,
        scaleY: 0.46,
        rotSpeed: 0.011,
      },
      // 4. Vibrant Purple / Magenta Accent (Core Depth Loop)
      {
        points: 70,
        colorStart: 'rgba(168, 85, 247, 1)',
        colorMid: 'rgba(217, 70, 239, 1)',
        colorEnd: 'rgba(244, 63, 94, 0.85)',
        speed: 0.9,
        freq: 1.8,
        phase: Math.PI * 0.35,
        tilt: -0.3,
        scaleX: 0.48,
        scaleY: 0.42,
        rotSpeed: -0.008,
      },
    ];

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      time += 0.022;

      // Mouse inertia
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.48;

      ctx.clearRect(0, 0, width, height);

      // ── 1. DARK GLASS SPHERICAL ORB BASE ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Deep Spherical Radial Gradient
      const bgGrad = ctx.createRadialGradient(
        cx + mouseX * 25,
        cy + mouseY * 25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      bgGrad.addColorStop(0, '#0c1026');
      bgGrad.addColorStop(0.5, '#070a18');
      bgGrad.addColorStop(0.85, '#03050c');
      bgGrad.addColorStop(1, '#010206');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // High-Intensity Pink Outer Corona Glow
      const pinkBacklight = ctx.createRadialGradient(
        cx + radius * 0.35,
        cy - radius * 0.35,
        0,
        cx + radius * 0.35,
        cy - radius * 0.35,
        radius * 0.85
      );
      pinkBacklight.addColorStop(0, 'rgba(255, 0, 128, 0.65)');
      pinkBacklight.addColorStop(0.6, 'rgba(236, 72, 153, 0.25)');
      pinkBacklight.addColorStop(1, 'rgba(236, 72, 153, 0)');
      ctx.fillStyle = pinkBacklight;
      ctx.fillRect(0, 0, width, height);

      // High-Intensity Cyan Outer Corona Glow
      const cyanBacklight = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy + radius * 0.35,
        0,
        cx - radius * 0.35,
        cy + radius * 0.35,
        radius * 0.85
      );
      cyanBacklight.addColorStop(0, 'rgba(0, 240, 255, 0.6)');
      cyanBacklight.addColorStop(0.6, 'rgba(6, 182, 212, 0.25)');
      cyanBacklight.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = cyanBacklight;
      ctx.fillRect(0, 0, width, height);

      // Deep Indigo Corona Glow
      const indigoBacklight = ctx.createRadialGradient(
        cx + radius * 0.4,
        cy + radius * 0.2,
        0,
        cx + radius * 0.4,
        cy + radius * 0.2,
        radius * 0.75
      );
      indigoBacklight.addColorStop(0, 'rgba(129, 140, 248, 0.45)');
      indigoBacklight.addColorStop(1, 'rgba(129, 140, 248, 0)');
      ctx.fillStyle = indigoBacklight;
      ctx.fillRect(0, 0, width, height);

      // ── 2. MÖBIUS WAVEFORM RIBBONS (Screen Additive Blending) ──
      ctx.globalCompositeOperation = 'screen';

      ribbons.forEach((ribbon, rIdx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * ribbon.rotSpeed + ribbon.tilt + mouseX * 0.35);

        const rScale = radius * 2;
        const pts = [];

        // Parametric 3D Lemniscate / Möbius Curve
        for (let i = 0; i <= ribbon.points; i++) {
          const t = (i / ribbon.points) * Math.PI * 2;
          const wave = Math.sin(t * ribbon.freq + time * ribbon.speed + ribbon.phase);
          const wave2 = Math.cos(t * 3 - time * 1.3);

          const scale = 1 + wave * 0.22 + wave2 * 0.1;
          const x = Math.sin(t) * rScale * ribbon.scaleX * scale;
          const y = (Math.sin(t) * Math.cos(t)) * rScale * ribbon.scaleY * scale + wave * 22;

          pts.push({ x, y });
        }

        // Draw multiple layered strokes for intense neon fluid glow
        for (let strokePass = 4; strokePass >= 1; strokePass--) {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);

          for (let i = 1; i < pts.length; i++) {
            const xc = (pts[i].x + pts[i - 1].x) / 2;
            const yc = (pts[i].y + pts[i - 1].y) / 2;
            ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
          }

          const grad = ctx.createLinearGradient(
            -radius * 0.6,
            -radius * 0.6,
            radius * 0.6,
            radius * 0.6
          );
          grad.addColorStop(0, ribbon.colorStart);
          grad.addColorStop(0.5, ribbon.colorMid);
          grad.addColorStop(1, ribbon.colorEnd);

          ctx.strokeStyle = grad;
          ctx.lineWidth = strokePass === 4 ? 48 : strokePass === 3 ? 28 : strokePass === 2 ? 14 : 5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = ribbon.colorStart;
          ctx.shadowBlur = strokePass === 4 ? 40 : strokePass === 3 ? 24 : strokePass === 2 ? 12 : 4;
          ctx.stroke();
        }

        ctx.restore();
      });

      // ── 3. SUPERNOVA CORE LIGHTING ──
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.45);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
      coreGrad.addColorStop(0.5, 'rgba(125, 211, 252, 0.55)');
      coreGrad.addColorStop(0.75, 'rgba(244, 114, 182, 0.3)');
      coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // Star-cross light spikes
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.08);
      const spikeGrad = ctx.createLinearGradient(-radius * 0.45, 0, radius * 0.45, 0);
      spikeGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      spikeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      spikeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = spikeGrad;
      ctx.fillRect(-radius * 0.45, -3, radius * 0.9, 6);
      ctx.rotate(Math.PI / 2);
      ctx.fillRect(-radius * 0.45, -3, radius * 0.9, 6);
      ctx.restore();

      // ── 4. GLOSSY SPHERICAL LENS SHEEN & RIM ──
      ctx.globalCompositeOperation = 'source-over';

      // Top Glass Sheen Crescent Highlight
      const sheenGrad = ctx.createRadialGradient(
        cx - radius * 0.32,
        cy - radius * 0.35,
        radius * 0.05,
        cx - radius * 0.32,
        cy - radius * 0.35,
        radius * 0.7
      );
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      sheenGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.15)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Spherical Vignette Ring
      const vignette = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.85, 'rgba(2, 4, 10, 0.45)');
      vignette.addColorStop(1, 'rgba(2, 4, 10, 0.9)');
      ctx.fillStyle = vignette;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Outer Glowing Ring Stroke
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.9)';
      ctx.shadowBlur = 24;
      ctx.stroke();
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center rounded-full select-none pointer-events-none ${className}`}
      style={{
        boxShadow:
          '0 0 80px rgba(56, 189, 248, 0.6), 0 0 60px rgba(236, 72, 153, 0.5), inset 0 0 45px rgba(56, 189, 248, 0.35)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full rounded-full" />
    </div>
  );
};

export default SiriMobiusOrb;
