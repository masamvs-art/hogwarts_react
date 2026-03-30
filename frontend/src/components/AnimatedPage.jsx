import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 22, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(4px)',
    transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
  },
}

function AnimatedPage({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.section>
  )
}

export default AnimatedPage
