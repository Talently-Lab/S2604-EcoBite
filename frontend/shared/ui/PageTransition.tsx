"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Slide-in fade used as a route `template` between pages. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
