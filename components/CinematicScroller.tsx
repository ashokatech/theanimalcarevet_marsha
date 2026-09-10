'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface CinematicScrollerProps {
  totalFrames: number;
}

export default function CinematicScroller({ totalFrames = 120 }: CinematicScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Frame cache to limit memory
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const maxCacheSize = 50;

  // Detect environment
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload nearby frames
  const preloadFrames = (currentFrame: number, sequencePath: string) => {
    for (let i = 1; i <= 10; i++) {
      const nextFrame = Math.min(currentFrame + i, totalFrames);
      if (!frameCache.current.has(nextFrame)) {
        const img = new Image();
        img.src = `${sequencePath}/frame_${nextFrame.toString().padStart(4, '0')}.webp`;
        frameCache.current.set(nextFrame, img);
      }
    }
    
    // Evict old frames to prevent memory bloat
    if (frameCache.current.size > maxCacheSize) {
      const keysToDelete = Array.from(frameCache.current.keys())
        .filter(k => Math.abs(k - currentFrame) > 20);
      keysToDelete.forEach(k => frameCache.current.delete(k));
    }
  };

  // Scroll tracking
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1) based on sticky container
      // Container height is e.g. 400vh. Scrollable distance = height - windowHeight
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      let rawProgress = scrolled / scrollableDistance;
      
      // Compress inactive holds on mobile
      if (isMobile) {
        rawProgress = rawProgress * 1.2 - 0.1; 
      }
      
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion, isMobile]);

  // Canvas drawing
  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine current frame
    const frameIndex = Math.max(1, Math.min(totalFrames, Math.floor(progress * totalFrames) + 1));
    const sequenceFolder = isMobile ? '/sequence/mobile' : '/sequence/desktop';
    
    // Draw
    const drawImage = (img: HTMLImageElement) => {
      // Cover logic
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    if (frameCache.current.has(frameIndex)) {
      const img = frameCache.current.get(frameIndex)!;
      if (img.complete) {
        drawImage(img);
      } else {
        img.onload = () => drawImage(img);
      }
    } else {
      const img = new Image();
      img.src = `${sequenceFolder}/frame_${frameIndex.toString().padStart(4, '0')}.webp`;
      img.onload = () => {
        frameCache.current.set(frameIndex, img);
        drawImage(img);
      };
      
      // Add fallback placeholder drawing in case images aren't generated yet
      img.onerror = () => {
        ctx.fillStyle = '#132e51'; // Navy background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#c51b78'; // Pink text
        ctx.font = '24px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Cinematic Sequence', canvas.width / 2, canvas.height / 2 - 15);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '16px Inter';
        ctx.fillText(`Frame ${frameIndex} (Awaiting Higgsfield Render)`, canvas.width / 2, canvas.height / 2 + 15);
      };
    }

    preloadFrames(frameIndex, sequenceFolder);
  }, [progress, isMobile, reducedMotion, totalFrames]);

  // Adjust canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [isMobile]);

  if (reducedMotion) {
    return (
      <div className="w-full min-h-screen bg-navy text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl md:text-7xl font-playfair font-semibold mb-6">Big love.<br/>Better care.<br/><span className="text-pink-600 italic">Because, family.</span></h1>
        <p className="text-lg text-slate-300 max-w-lg mb-8">Thoughtful veterinary care for your companions.</p>
        <Link href="/book" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-medium transition-colors">Book a visit</Link>
      </div>
    );
  }

  // Determine which text scene is active based on progress
  const scene1Opacity = progress < 0.25 ? 1 : progress < 0.35 ? 1 - ((progress - 0.25) * 10) : 0;
  const scene2Opacity = progress > 0.35 && progress < 0.65 ? (progress < 0.45 ? (progress - 0.35) * 10 : progress > 0.55 ? 1 - ((progress - 0.55) * 10) : 1) : 0;
  const scene3Opacity = progress > 0.65 ? (progress < 0.75 ? (progress - 0.65) * 10 : 1) : 0;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Canvas for the video sequence */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Semantic HTML Overlays - Separate from motion */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          
          {/* Scene 1 */}
          <div 
            className="absolute flex flex-col items-center justify-center transition-opacity duration-75"
            style={{ opacity: scene1Opacity, transform: `translateY(${(1 - scene1Opacity) * -20}px)` }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-semibold text-white mb-6 drop-shadow-lg">
              Big love.<br/>Better care.<br/>
              <span className="text-pink-400 italic">Because, family.</span>
            </h1>
          </div>

          {/* Scene 2 */}
          <div 
            className="absolute flex flex-col items-center justify-center transition-opacity duration-75 max-w-2xl"
            style={{ opacity: scene2Opacity, transform: `translateY(${(1 - scene2Opacity) * 20}px)` }}
          >
            <h2 className="text-4xl md:text-6xl font-playfair font-semibold text-white mb-4 drop-shadow-lg">
              Care that goes the extra paw.
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 drop-shadow-md">
              No clinical coldness. Only warmth, expertise, and gentle hands.
            </p>
          </div>

          {/* Scene 3 */}
          <div 
            className="absolute flex flex-col items-center justify-center transition-opacity duration-75 max-w-2xl"
            style={{ opacity: scene3Opacity, transform: `translateY(${(1 - scene3Opacity) * 20}px)` }}
          >
            <h2 className="text-4xl md:text-6xl font-playfair font-semibold text-white mb-4 drop-shadow-lg">
              A familiar face.
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 drop-shadow-md">
              A healthier, happier pet. We're here for them 7 days a week.
            </p>
            <div className="pointer-events-auto">
              <Link href="/book" className="bg-pink-600 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-medium text-lg transition-all shadow-xl hover:shadow-pink-600/20">
                Book a visit now
              </Link>
            </div>
          </div>

        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 animate-pulse">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
