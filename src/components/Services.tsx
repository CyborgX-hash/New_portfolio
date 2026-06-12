"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Zap, Activity } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "01",
    title: "Creative Development",
    description: "Developing animation-heavy layouts and interactive interfaces with focus on fluid layouts, micro-transitions, and custom scroll systems.",
    icon: Layers,
    features: ["Next.js & React Architectures", "Framer Motion Animations", "Responsive Typography Systems", "Tailwind UI Integration"],
  },
  {
    id: "02",
    title: "WebGL & Interactive Graphics",
    description: "Creating immersive visual art directly inside browser contexts. Specialized in high-performance particle models and shader programming.",
    icon: Cpu,
    features: ["HTML5 Canvas Computations", "Custom GLSL Shaders", "Fluid & Organic Simulations", "Interactive Physics Bindings"],
  },
  {
    id: "03",
    title: "Performance Optimization",
    description: "Auditing frame rates and rendering paths. Tuning core web metrics to maintain silky smooth 120 FPS states on mobile devices.",
    icon: Zap,
    features: ["Lighthouse Score Correction", "Asset Preloading Optimization", "CSS & Paint Cycle Tuning", "GPU Acceleration Integration"],
  },
  {
    id: "04",
    title: "Motion & UI Strategy",
    description: "Collaborating with designers to bridge static layouts and production. Defining motion frameworks and design token boundaries.",
    icon: Activity,
    features: ["Interactive Motion Prototyping", "Design System Implementation", "Interactive Intake Models", "UX Flow Refinements"],
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative bg-[#121212] py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 z-20">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="h-[1px] w-6 bg-blue-500" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Specialized Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
            What I Offer
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xl mt-6 leading-relaxed">
            Delivering technical craftsmanship that turns digital interfaces into premium products. Fusing visual arts with engineering metrics.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="glass-card group rounded-2xl p-8 md:p-10 relative flex flex-col justify-between"
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/30 transition-all duration-500" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-mono text-gray-600 tracking-widest">
                      {service.id}
                    </span>
                  </div>

                  {/* Title & Copy */}
                  <h3 className="text-2xl font-light tracking-tight text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 pt-6 border-t border-white/5">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2.5 text-xs text-gray-500 font-light font-mono">
                      <span className="w-1 h-1 rounded-full bg-blue-500/60 inline-block" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
