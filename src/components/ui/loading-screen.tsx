import { cn } from "@/lib/utils";

export function LoadingScreen({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-ivory", className)}>
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-2 border-gold/30 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-gold rounded-full animate-spin" />
        </div>
        <p className="text-navy/50 text-sm font-medium">LELLA</p>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="relative w-10 h-10 mx-auto mb-3">
          <div className="absolute inset-0 border-2 border-gold/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-gold rounded-full animate-spin" />
        </div>
        <p className="text-navy/40 text-sm">Chargement...</p>
      </div>
    </div>
  );
}
