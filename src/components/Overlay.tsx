"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1 Transforms: Center Aligned (Active range: ~0% - 20%)
  const opacityS1 = useTransform(scrollYProgress, [0.0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
  const yS1 = useTransform(scrollYProgress, [0.0, 0.05, 0.15, 0.22], [40, 0, 0, -40]);

  // Section 2 Transforms: Left Aligned (Active range: ~28% - 50%)
  const opacityS2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.52], [0, 1, 1, 0]);
  const yS2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.52], [40, 0, 0, -40]);

  // Section 3 Transforms: Right Aligned (Active range: ~58% - 82%)
  const opacityS3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.82], [0, 1, 1, 0]);
  const yS3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.82], [40, 0, 0, -40]);

  // Progress Bar for current scroll range
  const scrollIndicatorPercent = useTransform(scrollYProgress, [0, 0.9], [0, 100]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none select-none">
      
      {/* SECTION 1: 0% Scroll Progress (Centred Title) */}
      <motion.div
        style={{ opacity: opacityS1, y: yS1 }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <span className="text-[11px] font-mono tracking-[0.5em] text-blue-400 uppercase mb-4">
          Interactive Folio
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extralight tracking-tighter text-white">
          Saksham
        </h1>
        <p className="text-sm md:text-lg font-light tracking-[0.25em] text-gray-400 uppercase mt-4 max-w-lg">
          Senior Creative Developer
        </p>
      </motion.div>

      {/* SECTION 2: 30% Scroll Progress (Left Aligned) */}
      <motion.div
        style={{ opacity: opacityS2, y: yS2 }}
        className="fixed inset-y-0 left-0 w-full md:w-[60%] flex flex-col justify-center px-6 sm:px-16 md:px-24"
      >
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 text-white rounded-full">
              01
            </span>
            <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
              Core Expertise
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-white mb-6">
            I build high-end <br />
            <span className="text-gradient">digital experiences</span>.
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            Crafting fluid scroll interactions, performant WebGL shaders, and sleek user experiences where code merges with premium visual arts.
          </p>
        </div>
      </motion.div>

      {/* SECTION 3: 60% Scroll Progress (Right Aligned) */}
      <motion.div
        style={{ opacity: opacityS3, y: yS3 }}
        className="fixed inset-y-0 right-0 w-full md:w-[60%] flex flex-col justify-center items-end px-6 sm:px-16 md:px-24 text-right"
      >
        <div className="max-w-md">
          <div className="flex items-center justify-end space-x-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
              Design Philosophy
            </span>
            <span className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 text-white rounded-full">
              02
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-white mb-6">
            Bridging design <br />
            <span className="text-gradient-blue font-normal">&amp; engineering</span>.
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            Transforming static graphics into living, interactive storytelling. Focusing on frame rates, pixel density, and subtle micro-movements.
          </p>
        </div>
      </motion.div>

      {/* Persistent UI elements: bottom progress indicator */}
      <div className="fixed bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex justify-between items-end text-white z-20">
        {/* Scroll percentage */}
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-gray-500">SCROLL INDEX</span>
          <motion.span 
            className="text-xs font-mono"
            style={{
              opacity: useTransform(scrollYProgress, [0.0, 0.9], [1, 0.3])
            }}
          >
            SCRUBBING TIMELINE
          </motion.span>
        </div>

        {/* Scroll helper */}
        <motion.div 
          className="flex items-center space-x-3 font-mono text-[9px] tracking-[0.2em] text-gray-500"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 0.9], [1, 0])
          }}
        >
          <span>SCROLL DOWN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
        </motion.div>
      </div>

      {/* Left border track progress indicator */}
      <div className="fixed left-0 top-0 bottom-0 w-[1px] bg-white/5">
        <motion.div 
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-blue-500 to-indigo-500"
          style={{ height: useTransform(scrollIndicatorPercent, (p) => `${p}%`) }}
        />
      </div>
    </div>
  );
}
