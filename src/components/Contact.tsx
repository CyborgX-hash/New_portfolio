"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Briefcase, Mail, AlertCircle } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const CATEGORY_OPTIONS = [
  "Cafe Website",
  "Startup Website",
  "E-commerce Store",
  "Portfolio Website",
  "Custom Web Application",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sakshamfreelance1507@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          services: selectedCategories.length > 0 ? selectedCategories.join(", ") : "Not specified",
          _subject: `New Portfolio Inquiry from ${name}`,
          _template: "table",
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setSelectedCategories([]);
      } else {
        setSubmitError("Failed to send message. Please try again or email me directly.");
      }
    } catch {
      setSubmitError("Network error. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#121212] py-20 sm:py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 z-20">
      {/* Decorative glows */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12 sm:mb-20 text-center"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="h-[1px] w-6 bg-blue-500" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase">
              Start a Project
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
            Intake Proposal
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-lg mx-auto mt-6 leading-relaxed">
            Submit your project details below. I’ll review your goals and return with an interaction proposal within 24 hours.
          </p>
        </motion.div>

        {/* Main Form container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="glass-card rounded-3xl p-8 sm:p-12 relative"
        >
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-3">Proposal Received</h3>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">
                Thank you. Your project specifications have been logged. I will analyze your parameters and connect with you shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-mono tracking-widest text-blue-400 border border-blue-500/20 bg-blue-500/5 px-6 py-3 rounded-full hover:bg-blue-500/10 transition-colors duration-300"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Category Pills (Multi-Select) */}
              <div>
                <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Briefcase className="w-3 h-3 text-blue-500/80" />
                  What services do you require?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {CATEGORY_OPTIONS.map((category) => {
                    const isSelected = selectedCategories.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleToggleCategory(category)}
                        className={`text-xs font-mono px-4 py-2.5 rounded-full border transition-all duration-300 ${
                          isSelected
                            ? "bg-white text-black border-white"
                            : "bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Client Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="client-name" className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">
                    Your Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.03] transition-all duration-300"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="client-email" className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">
                    Email Address
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.03] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Project Scope Description */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="project-scope" className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">
                  Project Parameters &amp; Objectives
                </label>
                <textarea
                  id="project-scope"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the goals, assets, timelines, and animation styles you plan to leverage..."
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.03] transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button & Error Message */}
              <div className="pt-4 flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || !name || !email || !message}
                  className="w-full sm:w-auto text-xs font-mono tracking-widest bg-white text-black font-semibold px-8 py-4 rounded-full flex items-center justify-center space-x-2.5 shadow-lg hover:shadow-xl hover:bg-gray-100 disabled:bg-white/10 disabled:text-gray-500 transition-all duration-300 cursor-pointer pointer-events-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING PROPOSAL...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT PROPOSAL</span>
                    </>
                  )}
                </motion.button>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono px-5 py-3.5 rounded-xl w-full sm:w-auto justify-center"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </motion.div>
                )}
              </div>
            </form>
          )}
        </motion.div>

        {/* Contact Info Below Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {/* Email */}
          <a
            href="mailto:sakshamfreelance1507@gmail.com"
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 flex items-center justify-center transition-all duration-300">
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Email</span>
              <span className="text-sm font-light">sakshamfreelance1507@gmail.com</span>
            </div>
          </a>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] h-10 bg-white/5" />

          {/* Instagram */}
          <a
            href="https://www.instagram.com/misa_kraft?igsh=MWptYzQxaXhoeWoz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-pink-500/30 group-hover:bg-pink-500/5 flex items-center justify-center transition-all duration-300">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">Instagram</span>
              <span className="text-sm font-light">@misa_kraft</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
