"use client";

import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  content: string;
  width?: number;
  height?: number;
  onComplete?: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ 
  content, 
  width = 200, 
  height = 200,
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Draw the silver metallic circular cover
    const drawCover = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Gradient for silver metallic look
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, width / 10,
        width / 2, height / 2, width / 2
      );
      gradient.addColorStop(0, '#E8E8E8');
      gradient.addColorStop(0.5, '#C0C0C0');
      gradient.addColorStop(1, '#A9A9A9');

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add some "brushed metal" texture
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        const angle = Math.random() * Math.PI * 2;
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(
          width / 2 + Math.cos(angle) * (width / 2),
          height / 2 + Math.sin(angle) * (height / 2)
        );
        ctx.stroke();
      }
    };

    drawCover();
  }, [width, height]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const lastPos = useRef<{ x: number, y: number } | null>(null);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 40; // Increased brush size for better "smoothness" and faster reveal

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPos.current = { x, y };
    checkCompletion();
  };

  const checkCompletion = () => {
    if (isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    // If more than 15% of the circle is cleared, consider it "scratched"
    if (percentage > 15) {
      setIsScratched(true);
      if (onComplete) onComplete();
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPosition(e);
    lastPos.current = pos; // Initialize last position
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    lastPos.current = null; // Reset last position
  };

  return (
    <div className="scratch-card-container" style={{ position: 'relative', width, height }}>
      {/* Revealed Content */}
      <div 
        className="scratch-card-content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1
        }}
      >
        <span className="font-script" style={{ fontSize: width < 120 ? '1.5rem' : '2.5rem', color: '#8b4513' }}>
          {content}
        </span>
      </div>

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          cursor: isScratched ? 'default' : 'crosshair',
          transition: isScratched ? 'opacity 0.5s ease' : 'none',
          opacity: isScratched ? 0 : 1,
          pointerEvents: isScratched ? 'none' : 'auto'
        }}
      />
    </div>
  );
};

export default ScratchCard;
