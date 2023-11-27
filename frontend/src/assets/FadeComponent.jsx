import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FadeComponent = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  </AnimatePresence>
);
