import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Example } from '../components/home/Example'
import { FlagsContainer } from '../components/home/Flags'

export function Home () {
  return (
    <>
      <main className="text-light-mode-text dark:text-dark-mode-text grid place-content-center text-center">
        <section className="flex flex-col items-center gap-2 max-w-xl">
          <motion.h1
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-7xl font-bold italic"
          >
            Juega Latinoled
            <span className="block text-4xl pt-1">El wordle latino</span>
          </motion.h1>
          <motion.img
            animate={{ scale: [0.5, 1], opacity: [0, 1] }}
            transition={{ type: 'spring' }}
            src="../../src/assets/images/logo.png"
            alt=""
            className="w-16 h-16"
          />
          <p className="text-lg">
            <strong>Latinoled</strong> es un emocionante juego de palabras
            inspirado en el popular juego Wordle, pero con un toque cultural que
            te permite sumergirte en la riqueza lingüística de América Latina.
            Los jugadores tienen la oportunidad de elegir el país del cual
            desean adivinar palabras, lo que añade un elemento único y educativo
            al juego.
          </p>

          <Example />
          <FlagsContainer/>

          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            className="flex gap-2"
          >
            <Link
              to={'/jugar'}
              className="bg-[#212529] text-white px-6 py-3 rounded-md hover:bg-[#343A40] transition-colors font-bold text-center"
            >
              Jugar
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  )
}
