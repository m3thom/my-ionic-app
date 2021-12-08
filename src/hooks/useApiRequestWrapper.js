import { useHistory } from 'react-router-dom'

const useApiRequestWrapper = (request) => {
    const history = useHistory()
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
        isFetching
    } = request


    if (isError) {
        switch (error?.originalStatus) {
            case 401:
                history.replace('/users/sign_in')
                return;
            case 404:
                history.replace('/page_not_found')
                return;
            default:
                history.replace('/')
                return;
        }
    }
    return {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
        isFetching
    }
}

export default useApiRequestWrapper
