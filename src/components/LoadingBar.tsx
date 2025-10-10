import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * LoadingBar shows a slim progress bar at the top bound to scroll progress.
 */
const LoadingBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default LoadingBar; 