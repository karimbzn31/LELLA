"use client";

import { motion } from "framer-motion";
import { CalendarCheck, FileText, Heart, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { useAuthStore } from "@/store";

const stats = [
  { label: "Mes réservations", value: "3", icon: CalendarCheck, color: "text-gold", bg: "bg-gold/10" },
  { label: "Devis en cours", value: "2", icon: FileText, color: "text-bordeaux", bg: "bg-bordeaux/10" },
  { label: "Favoris", value: "8", icon: Heart, color: "text-terracotta", bg: "bg-terracotta/10" },
  { label: "Notifications", value: "5", icon: Bell, color: "text-navy", bg: "bg-navy/5" },
];

const recentBookings = [
  { provider: "Palais des Délices", date: "15 Juin 2026", status: "confirmé", statusColor: "text-success bg-success/10" },
  { provider: "Lumière & Instant", date: "20 Juillet 2026", status: "en attente", statusColor: "text-warning bg-warning/10" },
];

export default function ClientDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen pt-16 md:pt-20">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy">
              Bonjour, {user?.name || "Invité"} 👋
            </h1>
            <p className="text-navy/50 mt-1">Voici l&apos;avancement de vos préparatifs.</p>
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
                      <span className="text-2xl font-serif font-bold text-navy">{stat.value}</span>
                    </div>
                    <p className="text-sm text-navy/50">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card hover={false}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif font-semibold text-navy">Mes réservations</h2>
                  <span className="text-xs text-gold cursor-pointer hover:underline">Voir tout</span>
                </div>
                {recentBookings.map((booking, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-sand/30 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-navy">{booking.provider}</p>
                      <p className="text-xs text-navy/40">{booking.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${booking.statusColor}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card hover={false}>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-navy mb-4">Activité récente</h2>
                <p className="text-sm text-navy/40 text-center py-8">
                  Votre activité récente apparaîtra ici.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
