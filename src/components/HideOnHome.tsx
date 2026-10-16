"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function HideOnHome({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path === "/") return null;
  return children;
}
