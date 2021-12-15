import { getURLSearchParams } from 'helper/URLSearchParamsHelper'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, resetPage, selectPageConfig } from 'store/slices/pagesConfig'

const usePagesConfig = (stateKey) => {
    const pagesConfig = useSelector(selectPageConfig(stateKey))

    const dispatch = useDispatch()

    useEffect(() => {
        const popstateHanler = (event) => {
            event.preventDefault()
            const page = getURLSearchParams('page')
            if (page) setPage(page)
        }
        // window.onpopstate = popstateHanler
        return () => {
            window.removeEventListener('popstate', popstateHanler, false)
        }
    }, [])

    const handleSetPage = (page) => {
        dispatch(setPage({ stateKey, page }))
    }

    const handleResetPage = () => {
        dispatch(resetPage({ stateKey }))
    }

    return useMemo(() => {
        return [
            pagesConfig,
            {
                setPage: handleSetPage,
                resetPage: handleResetPage,
            }
        ]
    }, [pagesConfig, stateKey])
}

export default usePagesConfig
