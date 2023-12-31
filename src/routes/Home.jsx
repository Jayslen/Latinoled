import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Example } from '../components/home/Example'
import { FlagsContainer } from '../components/home/Flags'
import { homeModalData } from '../constants/MiniBoardData'

export function Home () {
  return (
    <>
      <main className="text-light-mode-text dark:text-dark-mode-text grid place-content-center text-center font-Poppins">
        <section className="flex flex-col items-center gap-2 max-w-xl">
          <motion.h1
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-4xl font-bold italic md:text-6xl"
          >
            Juega Latinoled
            <span className="block text-2xl pt-1 md:text-4xl ">El wordle latino</span>
          </motion.h1>
          <motion.img
            animate={{ scale: [0.5, 1], opacity: [0, 1] }}
            transition={{ type: 'spring' }}
            src="https://i.ibb.co/JkRcmBc/logo.png"
            alt=""
            className="w-16 h-16"
          />
          <p className="px-4 text-base max-w-xl md:text-lg md:p-0">
            <strong>Latinoled</strong> es un emocionante juego de palabras
            inspirado en el popular juego Wordle, pero con un toque cultural que
            te permite sumergirte en la riqueza lingüística de América Latina.
            Los jugadores tienen la oportunidad de elegir el país del cual
            desean adivinar palabras, lo que añade un elemento único y educativo
            al juego.
          </p>

          <Example board={homeModalData} />

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
