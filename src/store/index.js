import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { baseSplitApi } from './services/_base'
import applicationSlice from './slices/application'

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

export const store = configureStore({
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseSplitApi.middleware)
      .concat(rtkQueryShowToastOnError),
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [baseSplitApi.reducerPath]: baseSplitApi.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
  },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
