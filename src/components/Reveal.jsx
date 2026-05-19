import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 24, duration = 0.7, as = 'div', once = true, ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.21, 0.61, 0.35, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealStagger({ children, stagger = 0.08, delay = 0, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, y = 20, ...rest }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.61, 0.35, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
