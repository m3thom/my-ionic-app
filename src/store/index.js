import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { baseSplitApi } from './services/_base'
import applicationSlice from './slices/application'
import authSlice from './slices/auth'
import pagesConfig from './slices/pagesConfig'
import { rtkQueryShowToastOnError } from './middlewares'

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
    [authSlice.name]: authSlice.reducer,
    [pagesConfig.name]: pagesConfig.reducer,
  },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
