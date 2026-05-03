import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export function ScrollProgressBar() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.08], [0, 0, 1]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      data-testid="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] pointer-events-none bg-gradient-to-r from-gold/70 via-gold to-gold-light"
      style={{ scaleX, opacity }}
    />
  );
}
