export const initURLSearchParamsHelper = () => {
    return new URLSearchParams(document.location.search);
}

export const getURLSearchParamsHelper = (key, defualt = null) => {
    let params = initURLSearchParamsHelper()
    return params.get(key) || defualt
}

export const setURLSearchParamsHelper = (key, value) => {
    let params = initURLSearchParamsHelper()
    return params.set(key, value)
}
