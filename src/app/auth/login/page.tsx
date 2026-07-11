"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push("/marketplace");
    } else {
      setError("Email ou mot de passe incorrect");
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
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <span className="text-3xl font-serif font-bold text-navy">LELLA</span>
              <span className="text-gold text-xl">✦</span>
            </Link>
            <p className="text-navy/50 text-sm">
              Connectez-vous à votre compte
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-radius-card shadow-card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="vous@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Input
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] text-navy/30 hover:text-navy/50"
                  style={{ position: "relative", marginTop: "-34px", marginLeft: "auto", display: "block" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <p className="text-error text-sm">{error}</p>
              )}

              <Button
                type="submit"
                variant="gold"
                className="w-full gap-2"
                loading={isLoading}
              >
                Se connecter <ArrowRight size={16} />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-navy/50">
                Pas encore de compte ?{" "}
                <Link href="/auth/signup" className="text-gold hover:underline font-medium">
                  S&apos;inscrire
                </Link>
              </p>
            </div>

            {/* Hint pour la démo */}
            <div className="mt-6 p-4 bg-ivory rounded-radius-card">
              <p className="text-xs text-navy/40 flex items-center gap-1">
                <Sparkles size={12} />
                Mode démo — utilisez n&apos;importe quel email. Ajoutez &ldquo;admin&rdquo; ou &ldquo;provider&rdquo; pour tester les rôles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
