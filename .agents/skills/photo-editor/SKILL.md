---
name: photo-editor
description: Expert photo editing, background removal, portrait masking, color grading, image compositing, and asset optimization for web and UI design.
risk: safe
source: local
date_added: 2026-08-20
---

# Photo Editor & Image Processing Skill

Expert workflows for portrait cutout processing, non-destructive masking, color correction, silhouette compositing, and web asset optimization.

## Capabilities

1. **Portrait Cutout & Alpha Masking**:
   - Precise transparent background extraction (PNG, WebP).
   - Non-destructive CSS mask techniques (`mask-image: linear-gradient()`, `clip-path`).
   - Edge feathering, anti-aliasing, and rim glow lighting integration.

2. **Color Grading & Lighting Harmony**:
   - Matching portrait color temperature and rim lighting to background UI themes (Cyberpunk, Apple Glass, Dark Velvet, Minimal Monochrome).
   - High-contrast drop shadows (`filter: drop-shadow()`) and colored ambient flares.

3. **Digital Interface Compositing**:
   - 3D Pop-out / Breakthrough depth techniques (breaking out of top circle/card while masking base cleanly).
   - HUD overlays, reticles, glowing depth portals, and glassmorphism studio pedestals.

4. **Web Asset Optimization**:
   - Lossless and lossy compression (WebP, AVIF, PNG-8).
   - Responsive `srcset` generation and retina 2x display scaling.
   - Zero layout shift dimensions and SVG vector framing.

## Common Code Recipes

### 1. 3D Breakthrough / Pop-Out Portrait Frame
```jsx
<div className="relative w-[450px] h-[540px] flex items-center justify-center">
  {/* Background Portal / Circle */}
  <div className="absolute top-[16%] w-[420px] h-[420px] rounded-full z-0" />
  
  {/* Pop-Out Portrait (Emerges above circle, clipped at bottom) */}
  <div className="relative z-10 w-full h-full flex items-end justify-center">
    <img
      src="/portrait.png"
      className="w-auto h-[128%] max-w-none object-contain"
      style={{
        filter: 'drop-shadow(0 0 35px rgba(56,189,248,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 94%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 94%, rgba(0,0,0,0) 100%)',
      }}
    />
  </div>
</div>
```

### 2. Node.js Sharp Background Trimming & Resizing
```js
import sharp from 'sharp';

// Trim transparency and export high-res WebP
await sharp('input.png')
  .trim()
  .webp({ quality: 90 })
  .toFile('output.webp');
```
