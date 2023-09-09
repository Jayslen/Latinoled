import { Link } from 'react-router-dom'
import { Backdrop } from '../Backdrop'

export function WarnModal ({ clear }) {
  return (
        <Backdrop>
          <h2 className='text-4xl font-bold text-red-500'>Aviso</h2>
          <p>Ya has jugado con todas las palabras disponibles hasta el momento, proximamente se agragaran mas.</p>
          <p>Si quieres seguir jugando borra el registro de palabras.</p>
          <div className='flex justify-between gap-2 text-center text-slate-200'>
            <Link to={'/'} className='bg-gray-500 px-4 py-2 rounded grow hover:bg-gray-700 transition-colors'>Volver al inicio</Link>
            <button className='bg-[#538d4e] px-4 py-2 rounded grow hover:bg-[#43723f] transition-colors' onClick={clear}>Limpiar registro</button>
          </div>
        </Backdrop>
  )
}
