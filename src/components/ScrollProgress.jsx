import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] origin-left z-50 rounded-r-md"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
