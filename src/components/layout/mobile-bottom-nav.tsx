"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useUIStore } from "@/store";

const links = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Recherche", href: "/marketplace", icon: Search },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Favoris", href: "/dashboard/client", icon: Heart },
  { label: "Profil", href: "/auth/login", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const { unreadCount } = useUIStore();

  if (pathname.startsWith("/dashboard")) return null;

  const dashboardHref = user?.role === "admin" ? "/dashboard/admin" : user?.role === "provider" ? "/dashboard/provider" : "/dashboard/client";

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-sand/50 pb-safe">
      <div className="flex items-center justify-around h-14">
        {links.map((link) => {
          const Icon = link.icon;
          let href = link.href;
          if (link.href === "/auth/login" && isAuthenticated) href = dashboardHref;
          if (link.href === "/dashboard/client" && isAuthenticated) href = dashboardHref;
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link key={link.label} href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 relative min-w-[56px] min-h-[44px] justify-center",
                isActive ? "text-gold" : "text-navy/40 hover:text-navy/60"
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {link.label === "Messages" && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-bordeaux text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium leading-none">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
