import { Backdrop } from './Backdrop'
import { Example } from './home/Example'
import { IconX } from '@tabler/icons-react'
import { ruleModalData } from '../constants/MiniBoardData'

export function RulesModal ({ closeModal }) {
  return (
        <Backdrop>
          <div className='absolute -top-14 right-0 bg-[#DEE2E6] hover:bg-red-500 hover:scale-95 rounded-full p-2 group transition-colors cursor-pointer' onClick={closeModal}>
            <IconX className='text-red-500 group-hover:text-[#DEE2E6]'/>
          </div>
           <h2 className='text-2xl font-bold'>Reglas</h2>
           <ul className='flex flex-col gap-2'>
                <li className='list-decimal list-inside '>Cuando las letra estan en la misma posicion el color se vuelve verde.</li>
                <li className='list-decimal list-inside '>Cuando las letras esten incluidas en la palabra el color se vuelve amarillo. </li>
                <li className='list-decimal list-inside '>Cuando las letras no esten en la palabra el color se vuelve gris. </li>
           </ul>
           <div className='w-full flex justify-center'>
            <Example board={ruleModalData}/>
           </div>
        </Backdrop>
  )
}
