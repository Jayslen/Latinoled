import { motion } from 'framer-motion'

export function Backdrop ({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="backdrop-blur-2xl absolute top-0 w-screen h-screen grid place-content-center text-[#212529] p-4 z-10"
    >
      <motion.article
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="bg-[#DEE2E6] w-full h-auto px-4 py-3 flex flex-col gap-2 rounded sm:w-96 relative"
      >
        {children}
      </motion.article>
    </motion.section>
  )
}
