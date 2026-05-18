import { motion, useScroll, useSpring } from 'framer-motion';
import { VO, VO_LIGHT } from '../data/content';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${VO}, ${VO_LIGHT})`,
        scaleX,
        transformOrigin: 'left',
        zIndex: 9997,
        boxShadow: `0 0 12px ${VO}`,
      }}
    />
  );
}
