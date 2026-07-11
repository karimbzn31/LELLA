"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useUIStore } from "@/store";

const links = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Recherche", href: "/marketplace", icon: Search },
  { label: "Messages", href: "/messages", icon: Bell },
  { label: "Favoris", href: "/dashboard/client", icon: Heart },
  { label: "Profil", href: "/auth/login", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { unreadCount } = useUIStore();

  // Ne pas afficher sur les pages dashboard (elles ont leur propre layout)
  if (pathname.startsWith("/dashboard")) return null;

  const profileHref = isAuthenticated ? "/dashboard/client" : "/auth/login";

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-sand/50">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => {
          const Icon = link.icon;
          const href = link.href === "/auth/login" && isAuthenticated ? "/dashboard/client" : link.href;
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={link.label}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 relative",
                isActive ? "text-gold" : "text-navy/40 hover:text-navy/60"
              )}
            >
              <div className="relative">
                <Icon size={20} />
                {link.label === "Activité" && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-bordeaux text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{link.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
