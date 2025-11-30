"use client";

import { useReadingProgress } from "@/hooks/use-reading-progress";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const completion = useReadingProgress();
  return (
    <motion.span
      className="bg-accent absolute bottom-0 left-0 h-0.5 w-full origin-left"
      animate={{ scaleX: completion / 100 }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.15, ease: "linear" }}
    />
  );
};

export default ProgressBar;
