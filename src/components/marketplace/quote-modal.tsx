"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
}

export function QuoteModal({ isOpen, onClose, providerName }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "mariage",
    eventDate: "",
    guestCount: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setStep(1);
    }, 2500);
  };

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:max-w-lg bg-white rounded-2xl shadow-modal z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sand/30">
              <div>
                <h2 className="text-xl font-serif font-bold text-navy">Demander un devis</h2>
                <p className="text-sm text-navy/40 mt-0.5">{providerName}</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-navy/40 hover:text-navy transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center"
                >
                  <Send size={24} className="text-success" />
                </motion.div>
                <h3 className="text-lg font-serif font-semibold text-navy mb-2">Devis envoyé !</h3>
                <p className="text-sm text-navy/50">
                  {providerName} vous répondra sous 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Step 1: Contact info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-semibold text-navy/60 uppercase tracking-wider">
                      Vos informations
                    </h3>
                    <Input
                      label="Nom complet"
                      id="q-name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      id="q-email"
                      placeholder="vous@email.com"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                    <Input
                      label="Téléphone"
                      type="tel"
                      id="q-phone"
                      placeholder="+213 555 XX XX XX"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                    <div className="flex justify-end pt-2">
                      <Button type="button" variant="gold" onClick={() => setStep(2)}>
                        Suivant
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Event details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-semibold text-navy/60 uppercase tracking-wider">
                      Détails de l&apos;événement
                    </h3>

                    {/* Event type */}
                    <div>
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Type d&apos;événement
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => update("eventType", e.target.value)}
                        className="input-premium"
                      >
                        <option value="mariage">Mariage</option>
                        <option value="fiancailles">Fiançailles</option>
                        <option value="circoncision">Circoncision</option>
                        <option value="bapteme">Baptême / Aqiqa</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Date prévue"
                        type="date"
                        id="q-date"
                        value={formData.eventDate}
                        onChange={(e) => update("eventDate", e.target.value)}
                      />
                      <Input
                        label="Nombre d'invités"
                        type="number"
                        id="q-guests"
                        placeholder="~ 200"
                        value={formData.guestCount}
                        onChange={(e) => update("guestCount", e.target.value)}
                      />
                    </div>

                    <Input
                      label="Budget estimé (DA)"
                      type="number"
                      id="q-budget"
                      placeholder="500 000"
                      value={formData.budget}
                      onChange={(e) => update("budget", e.target.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Message (optionnel)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={3}
                        className="input-premium resize-none"
                        placeholder="Dites-en plus sur votre projet..."
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button type="submit" variant="gold" className="gap-2">
                        <Send size={16} /> Envoyer la demande
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
