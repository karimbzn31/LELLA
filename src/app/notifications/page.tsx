"use client";

import { motion } from "framer-motion";
import { Bell, MessageSquare, CalendarCheck, Star, Shield } from "lucide-react";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "quote",
    title: "Nouveau devis reçu",
    description: "Palais des Délices a répondu à votre demande de devis.",
    read: false,
    link: "/dashboard/client",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "message",
    title: "Nouveau message",
    description: "Vous avez reçu un message de Lumière & Instant.",
    read: false,
    link: "/dashboard/client",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "booking",
    title: "Réservation confirmée",
    description: "Votre réservation avec Nour El Hayat est confirmée pour le 20 juillet.",
    read: true,
    link: "/dashboard/client",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "review",
    title: "Nouvel avis",
    description: "Vous avez reçu un avis 5 étoiles !",
    read: true,
    link: "/dashboard/provider",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "notif-5",
    userId: "user-1",
    type: "system",
    title: "Bienvenue sur LELLA",
    description: "Merci de votre inscription. Complétez votre profil pour commencer.",
    read: true,
    link: "/dashboard/client",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
];

const typeIcons = {
  quote: CalendarCheck,
  booking: CalendarCheck,
  message: MessageSquare,
  review: Star,
  system: Shield,
};

const typeColors = {
  quote: "text-gold bg-gold/10",
  booking: "text-success bg-success/10",
  message: "text-info bg-info/10",
  review: "text-gold bg-gold/10",
  system: "text-navy bg-navy/5",
};

export default function NotificationsPage() {
  const { markAsRead } = useUIStore();

  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="section-container max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-navy">Notifications</h1>
          <span className="text-sm text-navy/40 flex items-center gap-1">
            <Bell size={16} />
            {mockNotifications.filter((n) => !n.read).length} non lues
          </span>
        </div>

        <div className="space-y-3">
          {mockNotifications.map((notif, i) => {
            const Icon = typeIcons[notif.type];
            const colorClass = typeColors[notif.type];

            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-radius-card transition-all cursor-pointer hover:shadow-card",
                  notif.read ? "bg-white" : "bg-gold/5 border border-gold/10"
                )}
                onClick={() => markAsRead(notif.id)}
              >
                <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm", notif.read ? "text-navy/60" : "text-navy font-medium")}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className={cn("text-xs mt-1", notif.read ? "text-navy/30" : "text-navy/50")}>
                    {notif.description}
                  </p>
                  <p className="text-xs text-navy/20 mt-1">
                    {new Date(notif.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
