"use client";

import { motion } from "framer-motion";
import { Store, Users, BarChart3, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

const stats = [
  { label: "Prestataires", value: "150", icon: Store, color: "text-gold", bg: "bg-gold/10" },
  { label: "Utilisateurs", value: "5,247", icon: Users, color: "text-bordeaux", bg: "bg-bordeaux/10" },
  { label: "Réservations", value: "892", icon: BarChart3, color: "text-terracotta", bg: "bg-terracotta/10" },
  { label: "Taux de croissance", value: "+23%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
];

const recentProviders = [
  { name: "Palais des Délices", category: "Traiteur", status: "Actif", statusColor: "text-success" },
  { name: "Nour El Hayat", category: "Neggafa", status: "En attente", statusColor: "text-warning" },
  { name: "Chaâbi Nights", category: "Orchestre", status: "Actif", statusColor: "text-success" },
  { name: "Déco Mirage", category: "Décoration", status: "Suspendu", statusColor: "text-error" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen pt-16 md:pt-20">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy">
              Administration LELLA 🛡️
            </h1>
            <p className="text-navy/50 mt-1">Gérez la plateforme et ses utilisateurs.</p>
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
                    </div>
                    <span className="text-2xl font-serif font-bold text-navy">{stat.value}</span>
                    <p className="text-sm text-navy/50 mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Providers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card hover={false}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif font-semibold text-navy">Prestataires récents</h2>
                  <span className="text-xs text-gold cursor-pointer hover:underline">Gérer</span>
                </div>
                {recentProviders.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-sand/30 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-navy">{p.name}</p>
                      <p className="text-xs text-navy/40">{p.category}</p>
                    </div>
                    <span className={`text-xs font-medium ${p.statusColor}`}>{p.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card hover={false}>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-navy mb-4">Actions rapides</h2>
                <div className="space-y-3">
                  {["Modérer les avis", "Valider les nouveaux prestataires", "Gérer les catégories", "Voir les signalements"].map(
                    (action) => (
                      <button
                        key={action}
                        className="w-full text-left px-4 py-3 rounded-radius-button bg-ivory text-sm text-navy/60 hover:bg-gold/10 hover:text-gold transition-all"
                      >
                        {action}
                      </button>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
