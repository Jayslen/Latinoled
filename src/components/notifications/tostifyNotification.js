import { toast } from 'react-toastify'

export const errorNotification = ({ errorMsg }) => {
  toast.error(errorMsg, {
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

export const succesNotification = ({ successMsg }) => {
  toast.success(successMsg, {
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
