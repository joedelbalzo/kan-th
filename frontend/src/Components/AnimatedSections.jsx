import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const AnimatedSection = ({ children, ...props }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 10, stiffness: 50 },
    },
  };

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={variants} {...props}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
