"use client";

import { motion } from "framer-motion";
import { Eye, MessageSquare, CalendarCheck, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { useAuthStore } from "@/store";

const stats = [
  { label: "Vues du profil", value: "1,247", change: "+12%", icon: Eye, color: "text-gold", bg: "bg-gold/10" },
  { label: "Demandes reçues", value: "18", change: "+5", icon: MessageSquare, color: "text-bordeaux", bg: "bg-bordeaux/10" },
  { label: "Réservations", value: "9", change: "+3", icon: CalendarCheck, color: "text-terracotta", bg: "bg-terracotta/10" },
  { label: "Taux de conversion", value: "64%", change: "+8%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
];

const recentRequests = [
  { client: "Inès M.", event: "Mariage", date: "12 Juin 2026", status: "Nouveau", statusColor: "text-gold bg-gold/10" },
  { client: "Amina K.", event: "Fiançailles", date: "10 Juin 2026", status: "Devis envoyé", statusColor: "text-info bg-info/10" },
  { client: "Sarah B.", event: "Mariage", date: "8 Juin 2026", status: "Confirmé", statusColor: "text-success bg-success/10" },
];

export default function ProviderDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen pt-16 md:pt-20">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy">
              Tableau de bord, {user?.name || "Prestataire"} 📊
            </h1>
            <p className="text-navy/50 mt-1">Gérez votre activité et vos demandes.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover={false}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon size={20} className={stat.color} />
                      </div>
                      <span className="text-xs text-success font-medium">{stat.change}</span>
                    </div>
                    <span className="text-2xl font-serif font-bold text-navy">{stat.value}</span>
                    <p className="text-sm text-navy/50 mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card hover={false}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif font-semibold text-navy">Demandes récentes</h2>
                  <span className="text-xs text-gold cursor-pointer hover:underline">Voir tout</span>
                </div>
                {recentRequests.map((req, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-sand/30 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-navy">{req.client}</p>
                      <p className="text-xs text-navy/40">{req.event} — {req.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${req.statusColor}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card hover={false}>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-navy mb-4">Aperçu du profil</h2>
                <p className="text-sm text-navy/50 mb-4">Votre profil public est visible.</p>
                <div className="flex items-center gap-4 text-sm text-navy/40">
                  <span>✦ Note: 4.8</span>
                  <span>•</span>
                  <span>43 avis</span>
                  <span>•</span>
                  <span>15 ans d&apos;exp.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
