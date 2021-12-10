import { USERS_BASE_PATH } from 'constants/routeConstants'

const usersPathHelper = () => {
    return {
        newUserRegistrationsPath: `/${USERS_BASE_PATH}/sign_up`,
        createUserRegistrationsPath: `/${USERS_BASE_PATH}`,
        newUserSessionsPath: `/${USERS_BASE_PATH}/sign_in`,
        createUserSessionsPath: `/${USERS_BASE_PATH}/sign_in`,
        deleteUserSessionsPath: `/${USERS_BASE_PATH}/sign_out`,
        refreshTokenUsersPath: `/${USERS_BASE_PATH}/refresh_token`,
    }
}

export default usersPathHelper
