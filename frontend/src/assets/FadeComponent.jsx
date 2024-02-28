import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FadeComponent = ({ children, isVisible }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, transition: { duration: 1 } }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
