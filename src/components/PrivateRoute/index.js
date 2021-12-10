import { Redirect, Route } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import usersPathHelper from 'helper/pathHelper/users'

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth()
    const { newUserSessionsPath } = usersPathHelper()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user
                    ? (
                        children
                    )
                    : (
                        <Redirect
                            to={{
                                pathname: newUserSessionsPath,
                                state: { from: location },
                            }}
                        />
                    )
            }
        />
    )
}
export default PrivateRoute
