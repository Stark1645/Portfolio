import { useEffect, useRef, useState } from 'react';
import { skillsData } from '../utils/data';

const getCategoryColor = (category, isLight) => {
  switch (category) {
    case 'Languages':
      return isLight ? 'rgba(37, 99, 235, 0.85)' : 'rgba(88, 166, 255, 0.85)'; // Blue
    case 'Frontend':
      return isLight ? 'rgba(219, 39, 119, 0.85)' : 'rgba(244, 63, 94, 0.85)'; // Pink/Rose
    case 'Backend':
      return isLight ? 'rgba(5, 150, 105, 0.85)' : 'rgba(16, 185, 129, 0.85)'; // Green/Emerald
    case 'Database':
      return isLight ? 'rgba(217, 119, 6, 0.85)' : 'rgba(245, 158, 11, 0.85)'; // Amber/Gold
    case 'Tools':
      return isLight ? 'rgba(124, 58, 237, 0.85)' : 'rgba(168, 85, 247, 0.85)'; // Purple
    case 'Core CS':
      return isLight ? 'rgba(14, 165, 233, 0.85)' : 'rgba(56, 189, 248, 0.85)'; // Sky/Cyan
    default:
      return 'rgba(139, 148, 158, 0.85)';
  }
};

const computeCenters = (width, height) => {
  const categories = Object.keys(skillsData);
  const total = categories.length;
  const centers = {};

  if (total <= 4) {
    centers['Languages'] = { x: width * 0.25, y: height * 0.3 };
    centers['Frontend']  = { x: width * 0.75, y: height * 0.3 };
    centers['Backend']   = { x: width * 0.25, y: height * 0.7 };
    centers['Tools']     = { x: width * 0.75, y: height * 0.7 };
  } else {
    const topRow = categories.slice(0, 3);
    const bottomRow = categories.slice(3);

    topRow.forEach((cat, idx) => {
      centers[cat] = {
        x: width * ((idx + 0.5) / topRow.length),
        y: height * 0.28
      };
    });

    bottomRow.forEach((cat, idx) => {
      centers[cat] = {
        x: width * ((idx + 0.5) / bottomRow.length),
        y: height * 0.72
      };
    });
  }
  return centers;
};

const InteractiveSkillsGraph = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 550 });
  const nodesRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = Math.max(520, window.innerHeight * 0.65);
        setDimensions({ width, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize nodes
  useEffect(() => {
    const { width, height } = dimensions;
    const isLight = document.documentElement.classList.contains('light');
    const centers = computeCenters(width, height);

    const newNodes = [];
    Object.entries(skillsData).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        const center = centers[category] || { x: width / 2, y: height / 2 };
        const textLen = skill.length;
        const radius = textLen > 20 ? 42 : textLen > 12 ? 36 : 32;

        newNodes.push({
          name: skill,
          category,
          x: center.x + (Math.random() - 0.5) * 80,
          y: center.y + (Math.random() - 0.5) * 80,
          vx: 0,
          vy: 0,
          radius,
          targetX: center.x,
          targetY: center.y,
          color: getCategoryColor(category, isLight),
          isHovered: false
        });
      });
    });

    nodesRef.current = newNodes;
  }, [dimensions]);

  // Main animation / Physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const updatePhysicsAndDraw = () => {
      const isLight = document.documentElement.classList.contains('light');
      const { width, height } = dimensions;
      const centers = computeCenters(width, height);

      ctx.clearRect(0, 0, width, height);

      // Draw Category Quadrant/Column dividers
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 8]);
      
      // Horizontal division line
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Vertical division lines
      [width * 0.333, width * 0.666].forEach((xPos) => {
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // Draw Category Labels
      Object.entries(centers).forEach(([catName, pos]) => {
        const labelY = pos.y < height * 0.5 ? 25 : height - 15;
        ctx.font = '900 12px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = isLight ? 'rgba(100, 116, 139, 0.6)' : 'rgba(139, 148, 158, 0.5)';
        ctx.textAlign = 'center';
        ctx.fillText(catName.toUpperCase(), pos.x, labelY);
      });

      const nodes = nodesRef.current;

      // 1. Gravity and Repulsion Forces
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        // Update targets dynamically
        const center = centers[nodeA.category] || { x: width / 2, y: height / 2 };
        nodeA.targetX = center.x;
        nodeA.targetY = center.y;
        nodeA.color = getCategoryColor(nodeA.category, isLight);

        // Attraction to category focal center
        if (nodeA !== draggedNodeRef.current) {
          const dx = nodeA.targetX - nodeA.x;
          const dy = nodeA.targetY - nodeA.y;
          nodeA.vx += dx * 0.006;
          nodeA.vy += dy * 0.006;
        }

        // Repulsion from other nodes (avoid overlaps)
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = nodeA.radius + nodeB.radius + 12;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const force = overlap * 0.04;
            const angle = Math.atan2(dy, dx);
            const fx = Math.cos(angle) * force;
            const fy = Math.sin(angle) * force;

            if (nodeA !== draggedNodeRef.current) {
              nodeA.vx -= fx;
              nodeA.vy -= fy;
            }
            if (nodeB !== draggedNodeRef.current) {
              nodeB.vx += fx;
              nodeB.vy += fy;
            }
          }
        }
      }

      // 2. Drag physics update
      if (draggedNodeRef.current) {
        const node = draggedNodeRef.current;
        node.x += (mousePosRef.current.x - node.x) * 0.35;
        node.y += (mousePosRef.current.y - node.y) * 0.35;
        node.vx = 0;
        node.vy = 0;
      }

      // 3. Draw Constellation lines within categories
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeA.category === nodeB.category) {
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const alpha = Math.max(0, 0.15 - dist / 180);
              ctx.strokeStyle = isLight 
                ? `rgba(0, 0, 0, ${alpha * 0.7})` 
                : `rgba(88, 166, 255, ${alpha * 0.6})`;
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        }
      }

      // 4. Update Node Positions & Draw Bubbles
      nodes.forEach((node) => {
        if (node !== draggedNodeRef.current) {
          node.vx *= 0.82;
          node.vy *= 0.82;
          node.x += node.vx;
          node.y += node.vy;

          const margin = node.radius + 10;
          if (node.x < margin) { node.x = margin; node.vx *= -0.5; }
          if (node.x > width - margin) { node.x = width - margin; node.vx *= -0.5; }
          if (node.y < margin) { node.y = margin; node.vy *= -0.5; }
          if (node.y > height - margin) { node.y = height - margin; node.vy *= -0.5; }
        }

        ctx.shadowBlur = node.isHovered ? 20 : 8;
        ctx.shadowColor = node.color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(22, 27, 34, 0.65)';
        ctx.strokeStyle = node.isHovered ? node.color.replace('0.85', '1') : node.color.replace('0.85', '0.25');
        ctx.lineWidth = node.isHovered ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        
        ctx.font = '700 11px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = isLight ? '#1e293b' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (node.name.length > 14 && node.name.includes(' ')) {
          const words = node.name.split(' ');
          const mid = Math.ceil(words.length / 2);
          const line1 = words.slice(0, mid).join(' ');
          const line2 = words.slice(mid).join(' ');
          ctx.fillText(line1, node.x, node.y - 6);
          ctx.fillText(line2, node.x, node.y + 6);
        } else {
          ctx.fillText(node.name, node.x, node.y);
        }
      });

      animationId = requestAnimationFrame(updatePhysicsAndDraw);
    };

    animationId = requestAnimationFrame(updatePhysicsAndDraw);
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };

    let isOverAnyNode = false;
    nodesRef.current.forEach((node) => {
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist < node.radius) {
        node.isHovered = true;
        isOverAnyNode = true;
      } else {
        node.isHovered = false;
      }
    });

    canvas.style.cursor = draggedNodeRef.current 
      ? 'grabbing' 
      : isOverAnyNode ? 'pointer' : 'default';
  };

  const handleMouseDown = () => {
    const { x, y } = mousePosRef.current;
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const node = nodesRef.current[i];
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist < node.radius) {
        draggedNodeRef.current = node;
        break;
      }
    }
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full rounded-2xl border border-white/5 bg-surface/25 backdrop-blur-md overflow-hidden shadow-inner cursor-default"
      style={{ minHeight: '520px' }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full block"
      />
    </div>
  );
};

export default InteractiveSkillsGraph;
