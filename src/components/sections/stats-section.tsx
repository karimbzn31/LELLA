"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const STATS = [
  { end: 150, suffix: "+", label: "Prestataires", desc: "vérifiés & sélectionnés" },
  { end: 2500, suffix: "+", label: "Événements", desc: "organisés avec succès" },
  { end: 5000, suffix: "+", label: "Familles", desc: "ont fait confiance" },
  { end: 48, suffix: "", label: "Wilayas", desc: "couvertes en Algérie" },
];

function AnimatedNumber({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 30;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gold/3 rounded-full blur-[80px]" />

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-6 md:w-8 bg-gold/30" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">En chiffres</span>
            <span className="h-px w-6 md:w-8 bg-gold/30" />
          </div>
          <h2 className="text-center text-xl md:text-4xl font-serif font-bold text-navy mb-8 md:mb-16">
            La confiance se mesure
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {STATS.map((stat, index) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center group"
              >
                <div className="relative inline-block">
                  <span className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-navy group-hover:text-gold transition-colors duration-500">
                    <AnimatedNumber end={stat.end} suffix={stat.suffix} />
                  </span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/40 to-gold/80 mx-auto transition-all duration-700 mt-1.5" />
                </div>
                <p className="text-sm md:text-base font-medium text-navy/80 mt-2">{stat.label}</p>
                <p className="text-[10px] md:text-xs text-navy/30 mt-0.5">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
