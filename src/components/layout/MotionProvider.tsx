"use client";

import { MotionConfig } from "framer-motion";

/** With a reduced-motion preference, movement is dropped and reveals become simple fades. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
