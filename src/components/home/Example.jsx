import { motion } from 'framer-motion'

export function Example () {
  const row = [
    { letter: 'M', delayLetter: 0.4, delayDiv: 2.0 },
    { letter: 'A', delayLetter: 0.6, delayDiv: 2.2 },
    { letter: 'N', delayLetter: 0.8, delayDiv: 2.4 },
    { letter: 'G', delayLetter: 1, delayDiv: 2.6 },
    { letter: 'U', delayLetter: 1.2, delayDiv: 2.8 }
  ]
  return (
    <div
      className="flex justify-center gap-2 w-[320px] animate-fade"
    >
      {row.map((item, index) => {
        return (
          <motion.div
            key={index}
            initial={{ border: 'solid 2px rgb(58,58,60)' }}
            animate={{
              backgroundColor: 'rgb(83,141,78)',
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
