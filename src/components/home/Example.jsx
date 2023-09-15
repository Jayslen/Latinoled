import { motion } from 'framer-motion'

export function Example ({ board }) {
  return (
    <div
      className="flex justify-center gap-2 w-[320px] animate-fade "
    >
      {board.map((item, index) => {
        return (
          <motion.div
            key={index}
            initial={{ border: 'solid 2px rgb(58,58,60)' }}
            animate={{
              backgroundColor: `${item.color}`,
              rotateX: '360deg',
              borderStyle: 'none'
            }}
            transition={{ delay: item.delayDiv, duration: 0.5 }}
            className="bg-transparent rounded w-full h-16 font-bold flex items-center justify-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: item.delayLetter }}
              className="text-xl"
            >
              {item.letter}
            </motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}
