import { useContext } from 'react'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import { GameData } from '../../context/gameDataContext'
import { UPDATE_COUNTRY } from '../../constants/reducerTypes'
import countries from '../../mocks/countries.json'
import 'react-toastify/dist/ReactToastify.css'

export function FlagsContainer () {
  const { state, dispatch } = useContext(GameData)

  const showError = () => {
    toast.error('Este pais estara disponible proximamente', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    })
  }

  const showSucces = ({ country }) => {
    toast.success(`Pais Cambiado a ${country}`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    })
  }

  return (
    <div className="w-[320px] flex flex-wrap gap-2 justify-center">
      {countries.map((item, index) => {
        const { country, available, image } = item
        return (
          <motion.img
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
              translateX: { delay: `0.${index + 5}`, type: 'spring' },
              opacity: { delay: `0.${index + 5}`, type: 'spring' }
            }}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
            key={country}
            src={image}
            alt={country}
            className={`h-12 ${
              !available
                ? 'grayscale cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            onClick={() => {
              if (available) {
                dispatch({ payload: country, type: UPDATE_COUNTRY })
                showSucces({ country })
              } else {
                showError()
              }
            }}
          />
        )
      })}
      <p>
        Pais seleccionado <strong className="capitalize">{state.country}</strong>
      </p>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
