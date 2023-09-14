import { Backdrop } from './Backdrop'
import { Example } from './home/Example'
import { IconX } from '@tabler/icons-react'
import { ruleModalData } from '../constants/MiniBoardData'

export function RulesModal ({ closeModal }) {
  const row = [
    { letter: 'M', delayLetter: 0.4, delayDiv: 2.0, color: '#538d4e' },
    { letter: 'A', delayLetter: 0.6, delayDiv: 2.2, color: '#b59f3b' },
    { letter: 'N', delayLetter: 0.8, delayDiv: 2.4, color: '#b59f3b' },
    { letter: 'G', delayLetter: 1, delayDiv: 2.6, color: '#3a3a3c' },
    { letter: 'U', delayLetter: 1.2, delayDiv: 2.8, color: '#3a3a3c' }
  ]
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
