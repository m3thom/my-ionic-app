import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from './layout/ErrorBoundary'
import { getLocalData, resetLocalData, setLocalData } from 'helper/localStorageHelper'
import { useRefreshTokenUserMutation } from 'store/services/users'
import usersPathHelper from 'helper/pathHelper/users'
import { useDispatch } from 'react-redux'
import { resetCredentials, setCredentials } from 'store/slices/auth'
import { AUTH_SLICE_NAME } from 'constants/sliceNameConstants'

const InitializedLayout = ({ children }) => {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)
  const { refreshTokenUsersPath } = usersPathHelper()
  const [refreshTokenUser, { }] = useRefreshTokenUserMutation()

  useEffect(() => {
    const loadAuthFromLocalStorage = async () => {
      const user = await getLocalData(AUTH_SLICE_NAME);
      if (user) {
        dispatch(setCredentials(user))
        try {
          const user = await refreshTokenUser({ url: refreshTokenUsersPath }).unwrap();
          await setLocalData(AUTH_SLICE_NAME, user);
          dispatch(setCredentials(user))
        } catch (error) {
          await resetLocalData();
          dispatch(resetCredentials())
          console.error('InitializedLayout', error);
        }
      }
      setReady(true)
    }
    loadAuthFromLocalStorage()
  }, [])

  return (
    <>
      <ErrorBoundary>
        {ready ? children : 'Loading...'}
      </ErrorBoundary>
    </>
  )
}

InitializedLayout.propTypes = {
  children: PropTypes.node
}

export default InitializedLayout
