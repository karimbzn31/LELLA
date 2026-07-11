"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/lib/mock-data";

const allReviews = reviews.slice(0, 4);

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % allReviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  const r = allReviews[current];

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      {/* Ornement de fond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Témoignages</span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
            La parole à nos mariées
          </h2>
          <p className="text-navy/50 mt-3 max-w-md mx-auto">
            Des centaines de femmes nous ont fait confiance. Voici leurs histoires.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 md:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Quote décorative */}
                <div className="text-6xl font-serif text-gold/10 leading-none mb-2">&ldquo;</div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-gold text-gold" />
                  ))}
                </div>

                {/* Commentaire */}
                <p className="text-navy/70 text-lg md:text-xl leading-relaxed italic mb-8 max-w-xl mx-auto">
                  &ldquo;{r.comment}&rdquo;
                </p>

                {/* Signature */}
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                    <span className="text-base font-serif font-bold text-gold">{r.clientName.charAt(0)}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-navy">{r.clientName}</p>
                    <p className="text-xs text-navy/30">
                      {r.eventType === "mariage" ? "Mariage" : r.eventType === "fiancailles" ? "Fiançailles" : "Célébration"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setCurrent((p) => (p - 1 + allReviews.length) % allReviews.length)} className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-navy/30 hover:text-gold hover:border-gold/30 transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {allReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-gold" : "w-1.5 bg-sand hover:bg-gold/50"}`}
                />
              ))}
            </div>
            <button onClick={() => setCurrent((p) => (p + 1) % allReviews.length)} className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-navy/30 hover:text-gold hover:border-gold/30 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
