import { useContext } from 'react'
import { motion } from 'framer-motion'
import { UserGameData } from '../../context/userGameDataContext'
import { UPDATE_COUNTRY } from '../../constants/reducerTypes'
import countries from '../../mocks/countries.json'
import { errorNotification, succesNotification } from '../notifications/tostifyNotification'
import 'react-toastify/dist/ReactToastify.css'

export function FlagsContainer () {
  const { userData: { country: userCountry }, dispatchUserData } = useContext(UserGameData)

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
                dispatchUserData({ payload: country, type: UPDATE_COUNTRY })
                window.localStorage.setItem('country', country)
                succesNotification({ successMsg: `Pais selecionado ${country}` })
              } else {
                errorNotification({ errorMsg: `${country} estara disponible proximamente` })
              }
            }}
          />
        )
      })}
      <p className='font-sans'>
        Pais seleccionado <strong className="capitalize">{userCountry}</strong>
      </p>

    </div>
  )
}
