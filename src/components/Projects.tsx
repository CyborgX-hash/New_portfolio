"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Film, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";

// Custom Lucide-styled GitHub Icon SVG
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string[];
  links: {
    github?: string;
    live: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: "Baagh Entertainment",
    category: "Film Production Platform",
    description: "A cinematic, dark-themed production company website built for India's film industry. Features a full-screen video hero, interactive service showcase cards for Line Production, Location Management, Casting Coordination, Vanity Vans, Equipment Logistics & Shooting Permissions. Includes animated stats counters and a responsive mobile-first layout with smooth scroll transitions.",
    image: "/images/baagh_entertainment.png",
    tags: ["Next.js", "React", "CSS Modules", "Responsive Design"],
    metrics: ["6 Service Pages", "33+ Cities Covered", "24/7 Support Portal"],
    links: {
      live: "https://baaghentertainment.com",
    },
    icon: Film,
  },
  {
    title: "Unique Infosolution",
    category: "Cybersecurity Platform",
    description: "A professional cybersecurity and digital forensics platform featuring Threat Assessment, Network Security, Penetration Testing, Web & Cloud Security services. Integrates an online certificate verification system, course enrollment for ethical hacking & digital forensics training, client testimonial carousel, and a modern dark UI with neon-green accents conveying trust and technical authority.",
    image: "/images/unique_infosolution.png",
    tags: ["Web Development", "UI/UX Design", "Responsive", "SEO Optimized"],
    metrics: ["6 Core Services", "Certificate Verify", "Training Portal"],
    links: {
      live: "https://uniqueinfosolution.com",
    },
    icon: Shield,
  },
];

export default function Projects() {
  return (
    <section className="relative bg-[#121212] py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 z-20">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-32 text-center md:text-left"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="h-[1px] w-6 bg-blue-500" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Selected Creations
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
            Case Studies
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xl mt-6 leading-relaxed">
            Real-world projects delivered for clients — from cinematic film production platforms to enterprise cybersecurity solutions.
          </p>
        </motion.div>

        {/* Alternating Split Projects Grid */}
        <div className="space-y-40">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-20 items-center`}
              >
                {/* 1. Large Mockup Panel (Left or Right) */}
                <div className="w-full lg:w-[55%] relative group">
                  {/* Subtle hover glow ring */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Frame Container */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white/2 bg-[#1a1a1a] border border-white/5 group-hover:border-white/10 transition-colors duration-500 shadow-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out grayscale-[20%] group-hover:grayscale-0"
                    />
                    
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Floating Category Pill */}
                    <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Text Details Panel (Right or Left) */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center">
                  <span className="text-xs font-mono text-gray-500 tracking-widest mb-3">
                    PROJECT { (index + 1).toString().padStart(2, "0") }
                  </span>
                  
                  <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Rich Stats / Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                    {project.metrics.map((metric, metricIdx) => (
                      <div key={metricIdx} className="flex flex-col">
                        <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase mb-1.5 flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5 text-blue-500/80" />
                          Metric
                        </span>
                        <span className="text-xs sm:text-sm text-white font-mono tracking-tight">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[9px] font-mono tracking-wider text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Actions */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-white/5">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white flex items-center space-x-1.5 text-xs font-mono transition-colors duration-300 pointer-events-auto"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>SOURCE CODE</span>
                      </a>
                    )}

                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 flex items-center space-x-1.5 text-xs font-mono tracking-widest transition-colors duration-300 pointer-events-auto"
                    >
                      <span>VISIT SITE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer info text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-40 text-center border-t border-white/5 pt-12"
        >
          <p className="text-xs font-mono tracking-widest text-gray-600 uppercase">
            Designed &amp; Engineered by Saksham © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
