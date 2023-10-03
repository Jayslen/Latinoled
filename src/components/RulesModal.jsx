import { Backdrop } from './Backdrop'
import { Example } from './home/Example'
import { ruleModalData } from '../constants/MiniBoardData'
import { motion } from 'framer-motion'

export function RulesModal () {
  return (
    <>
      <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring' }}
      className="bg-[#DEE2E6] dark:shadow-none shadow-2xl shadow-black  w-full h-auto px-4 py-2 text-ri flex flex-col gap-2 rounded-lg absolute z-10 sm:right-0 top-13 sm:w-80 sm:mr-2">

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
      </motion.article>
    </>
  )
}
