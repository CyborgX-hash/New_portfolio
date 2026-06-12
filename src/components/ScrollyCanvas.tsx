"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 39;

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const lastRenderedIndexRef = useRef<number>(-1);

  // Helper to generate frame paths
  const getFramePath = (index: number) => {
    return `/sequence/frame_${index.toString().padStart(2, "0")}_delay-0.066s.webp`;
  };

  // 1. Preload Images
  useEffect(() => {
    let loaded = 0;
    let errors = 0;
    const images: HTMLImageElement[] = [];

    // Preload all frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        
        // Draw the first frame immediately once it's loaded so the user doesn't see a blank screen
        if (i === 0 && lastRenderedIndexRef.current === -1) {
          drawFrame(0);
        }

        if (loaded + errors === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        errors++;
        setErrorCount((prev) => prev + 1);
        console.error(`Failed to load frame: ${getFramePath(i)}`);
        
        if (loaded + errors === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      // Cleanup
      imagesRef.current = [];
    };
  }, []);

  // 2. Draw Frame function with Object-Fit: Cover math
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate aspect ratios
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image aspect ratio
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedIndexRef.current = index;
  };

  // 3. Canvas Resizing Handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set canvas dimensions to support high-DPI displays
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Redraw current frame
      const currentIndex = lastRenderedIndexRef.current >= 0 ? lastRenderedIndexRef.current : 0;
      drawFrame(currentIndex);
    };

    // Initial size setup
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesLoaded]);

  // 4. React to Scroll Progress Changes
  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    if (!imagesLoaded) return;

    // Map scroll progress (0 to 1) to image frame index (0 to 74)
    // Add slightly higher weight so it scrubs through all frames completely before section ends
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latestValue * TOTAL_FRAMES))
    );

    if (frameIndex !== lastRenderedIndexRef.current) {
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  const percentProgress = Math.round(((loadedCount + errorCount) / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Luxury Preloader Screen */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] select-none"
          >
            <div className="flex flex-col items-center space-y-6 max-w-md w-full px-8">
              {/* Creator Branding */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-xs font-mono tracking-[0.4em] text-gray-500 uppercase">
                  Creative Portfolio
                </h2>
                <h1 className="text-3xl font-light tracking-widest text-white mt-2 font-sans uppercase">
                  SAKSHAM
                </h1>
              </motion.div>

              {/* Progress Slider (Bar) */}
              <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white"
                  style={{ width: `${percentProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Loader Status / Details */}
              <div className="flex justify-between w-full text-[10px] font-mono tracking-widest text-gray-400">
                <span>INITIALIZING ENGINE</span>
                <span className="text-white">{percentProgress.toString().padStart(3, "0")}%</span>
              </div>
            </div>

            {/* Glowing Accent Ring (Subtle behind logo) */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover pointer-events-none block"
          style={{
            // Match CSS sizes to bounds, canvas dimensions are managed inside handleResize via dpr
            width: "100%",
            height: "100%",
          }}
        />
        {/* Soft shadow gradients overlay for canvas blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/40 via-transparent to-[#121212]/40 pointer-events-none" />
      </div>
    </>
  );
}
