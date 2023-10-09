import { motion } from 'framer-motion'
import { Example } from './home/Example'
import { ruleModalData } from '../constants/MiniBoardData'
import { headerModalsAnimation } from '../constants/animations'

export function RulesModal () {
  return (
    <>
      <motion.div
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        variants={headerModalsAnimation}
        className="bg-[#DEE2E6] dark:shadow-none shadow-2xl shadow-black text-light-mode-text w-full h-auto px-4 py-2 text-ri flex flex-col gap-2 rounded-lg absolute right-0 z-10 sm:right-0 top-12 sm:w-80 sm:mr-2"
      >
        <h2 className="text-2xl font-bold">Reglas</h2>
        <ul className="flex flex-col gap-2">
          <li className="list-decimal list-inside ">
            Cuando las letra estan en la misma posicion el color se vuelve
            verde.
          </li>
          <li className="list-decimal list-inside ">
            Cuando las letras esten incluidas en la palabra el color se vuelve
            amarillo.{' '}
          </li>
          <li className="list-decimal list-inside ">
            Cuando las letras no esten en la palabra el color se vuelve gris.{' '}
          </li>
        </ul>
        <div className="w-full flex justify-center">
          <Example board={ruleModalData} />
        </div>
      </motion.div>
    </>
  )
}
