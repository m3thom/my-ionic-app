
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryShowToastOnError = (_api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message = action?.payload?.data ?? "Oops, something went wrong."
    toast.error(message)
  }

  return next(action)
}
