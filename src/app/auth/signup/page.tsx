"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const success = await signup(name, email, password, role);
    if (success) {
      router.push("/marketplace");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="section-container w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <span className="text-3xl font-serif font-bold text-navy">LELLA</span>
              <span className="text-gold text-xl">✦</span>
            </Link>
            <p className="text-navy/50 text-sm">Créez votre compte</p>
          </div>

          <div className="bg-white p-8 rounded-radius-card shadow-card">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={cn(
                  "p-4 rounded-radius-card border-2 text-center transition-all",
                  role === "client"
                    ? "border-gold bg-gold/5"
                    : "border-sand/50 hover:border-gold/30"
                )}
              >
                <User size={24} className={cn("mx-auto mb-1", role === "client" ? "text-gold" : "text-navy/30")} />
                <span className={cn("text-sm font-medium", role === "client" ? "text-gold" : "text-navy/50")}>
                  Client
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole("provider")}
                className={cn(
                  "p-4 rounded-radius-card border-2 text-center transition-all",
                  role === "provider"
                    ? "border-gold bg-gold/5"
                    : "border-sand/50 hover:border-gold/30"
                )}
              >
                <Store size={24} className={cn("mx-auto mb-1", role === "provider" ? "text-gold" : "text-navy/30")} />
                <span className={cn("text-sm font-medium", role === "provider" ? "text-gold" : "text-navy/50")}>
                  Prestataire
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nom complet"
                id="name"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="vous@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Mot de passe"
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-error text-sm">{error}</p>}

              <Button
                type="submit"
                variant="gold"
                className="w-full gap-2"
                loading={isLoading}
              >
                Créer mon compte <ArrowRight size={16} />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-navy/50">
                Déjà un compte ?{" "}
                <Link href="/auth/login" className="text-gold hover:underline font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
