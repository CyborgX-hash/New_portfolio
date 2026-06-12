"use client";

import { motion } from "framer-motion";
import { Compass, Film, Code, Sparkles } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "Aligning on project scopes, target budgets, content assets, interactive goals, and creative design aesthetics before writing code.",
    icon: Compass,
    deliverables: ["Architecture Roadmap", "Interaction Wireframes", "Asset Checklist"],
  },
  {
    step: "02",
    title: "Motion Prototyping",
    description: "Building fast, browser-based sandboxes to test scroll math, image frame loads, canvas frame rates, and WebGL shader algorithms.",
    icon: Film,
    deliverables: ["Motion Proof-of-Concepts", "Performance Budgets", "Asset Compression Tests"],
  },
  {
    step: "03",
    title: "Production Engineering",
    description: "Developing clean production assets inside Next.js 14 with TypeScript, modular components, strict types, and robust responsiveness.",
    icon: Code,
    deliverables: ["Clean React App Router Core", "State & Scroll Bindings", "Retina Canvas Scaling"],
  },
  {
    step: "04",
    title: "Optimization & Launch",
    description: "Auditing painting cycles, optimizing bundle chunks, preloading static image sequences, and scaling SEO metadata tags for 99+ Lighthouse cores.",
    icon: Sparkles,
    deliverables: ["Silky 120 FPS Rendering", "99+ Lighthouse Audit Reports", "Fluid Deployment Configs"],
  },
];

export default function Process() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative bg-[#121212] py-20 sm:py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 z-20">
      {/* Background glow lighting */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 sm:mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="h-[1px] w-6 bg-blue-500" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Production Lifecycle
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
            Work Process
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xl mt-6 leading-relaxed">
            A structured workflow tailored to bring design mockups to life in high performance, ensuring robust delivery timelines.
          </p>
        </motion.div>

        {/* Stepped Timeline Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="glass-card group rounded-2xl p-6 relative flex flex-col justify-between"
              >
                {/* Visual Step connector lines for large displays */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[100%] w-[calc(100%-48px)] h-[1px] border-t border-dashed border-white/10 z-0" />
                )}

                <div className="relative z-10">
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-mono text-blue-400 font-medium">
                      STAGE {step.step}
                    </span>
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-light text-white tracking-tight mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-white/5 relative z-10">
                  <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase mb-2 block">
                    Key Deliverables
                  </span>
                  <div className="space-y-1.5">
                    {step.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle bottom hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
