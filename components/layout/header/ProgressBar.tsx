"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const completion = useReadingProgress();
  return (
    <motion.span
      className="bg-muted-foreground absolute bottom-0 left-0 h-px w-full origin-left"
      animate={{
        scaleX: completion / 100,
        transition: { duration: 0.15, ease: "linear" },
      }}
      initial={{ scaleX: 0, transition: { duration: 0.15, ease: "linear" } }}
    />
  );
};

export default ProgressBar;
