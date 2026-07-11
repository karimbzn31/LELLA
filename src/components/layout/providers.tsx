"use client";

import { CustomCursor } from "@/components/ui/custom-cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
