"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, CalendarCheck, FileText, Heart, MessageSquare,
  User, Settings, LogOut, Store, Users, BarChart3, Shield,
} from "lucide-react";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface SidebarItem {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
}

const clientLinks: SidebarItem[] = [
  { label: "Vue d'ensemble", icon: LayoutDashboard, href: "/dashboard/client" },
  { label: "Mes réservations", icon: CalendarCheck, href: "/dashboard/client" },
  { label: "Mes devis", icon: FileText, href: "/dashboard/client" },
  { label: "Mes favoris", icon: Heart, href: "/dashboard/client" },
  { label: "Messages", icon: MessageSquare, href: "/dashboard/client" },
  { label: "Mon profil", icon: User, href: "/dashboard/client" },
];

const providerLinks: SidebarItem[] = [
  { label: "Vue d'ensemble", icon: LayoutDashboard, href: "/dashboard/provider" },
  { label: "Demandes reçues", icon: FileText, href: "/dashboard/provider" },
  { label: "Réservations", icon: CalendarCheck, href: "/dashboard/provider" },
  { label: "Galerie", icon: Store, href: "/dashboard/provider" },
  { label: "Messages", icon: MessageSquare, href: "/dashboard/provider" },
  { label: "Mon profil", icon: User, href: "/dashboard/provider" },
  { label: "Paramètres", icon: Settings, href: "/dashboard/provider" },
];

const adminLinks: SidebarItem[] = [
  { label: "Vue d'ensemble", icon: BarChart3, href: "/dashboard/admin" },
  { label: "Utilisateurs", icon: Users, href: "/dashboard/admin" },
  { label: "Prestataires", icon: Store, href: "/dashboard/admin" },
  { label: "Catégories", icon: Shield, href: "/dashboard/admin" },
  { label: "Avis", icon: MessageSquare, href: "/dashboard/admin" },
  { label: "Paramètres", icon: Settings, href: "/dashboard/admin" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const role = user?.role || "client";
  const links =
    role === "admin" ? adminLinks : role === "provider" ? providerLinks : clientLinks;

  return (
    <aside className="w-64 bg-white border-r border-sand/50 min-h-screen hidden lg:block">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <span className="text-xl font-serif font-bold text-navy">LELLA</span>
          <span className="text-gold">✦</span>
        </Link>

        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-radius-button text-sm transition-all",
                pathname === link.href
                  ? "bg-gold/10 text-gold font-medium"
                  : "text-navy/50 hover:text-navy hover:bg-ivory"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-sand/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-navy/40 hover:text-error transition-colors w-full"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
