import { cn } from "@/lib/utils";
import {
  UtensilsCrossed, Building2, Home, Camera, Video, Music,
  Sparkles, Heart, Gem, Flame, Palette, LayoutDashboard, Radio,
  CakeSlice, Cake, Car, SprayCan, Scissors, Star, Tent, Mic,
  ClipboardList, Pen, Mail, Flower2, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "building2": Building2,
  "home": Home,
  "utensils-crossed": UtensilsCrossed,
  "cake-slice": CakeSlice,
  "cake": Cake,
  "layout-dashboard": LayoutDashboard,
  "flower-2": Flower2,
  "camera": Camera,
  "video": Video,
  // Drone pas dispo dans cette version de lucide → fallback Camera
  "drone": Camera,
  "music": Music,
  // Music2 pas dispo → fallback Music
  "music-2": Music,
  "radio": Radio,
  "mic": Mic,
  "sparkles": Sparkles,
  "heart": Heart,
  "gem": Gem,
  "spray-can": SprayCan,
  "scissors": Scissors,
  "flame": Flame,
  "palette": Palette,
  "car": Car,
  "star": Star,
  "tent": Tent,
  "clipboard-list": ClipboardList,
  "pen": Pen,
  "mail": Mail,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

interface CategoryIconProps {
  icon: string;
  className?: string;
  size?: number;
}

export function CategoryIcon({ icon, className, size = 24 }: CategoryIconProps) {
  const Icon = getIcon(icon);
  return <Icon size={size} className={cn("text-gold", className)} />;
}
