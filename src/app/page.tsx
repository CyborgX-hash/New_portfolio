"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <main className="relative min-h-screen bg-[#121212]">
      {/* Scroll-driven Hero Section with Canvas Sequence */}
      <div ref={containerRef} className="relative h-[500vh]">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>

      {/* Services Capabilities Grid */}
      <Services />

      {/* Redesigned Alternating Case Studies */}
      <Projects />

      {/* Stepped Process Lifecycle */}
      <Process />

      {/* Interactive Contact Intake Form */}
      <Contact />
    </main>
  );
}

