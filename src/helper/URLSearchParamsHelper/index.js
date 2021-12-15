export const initURLSearchParams = () => {
    return new URLSearchParams(document.location.search);
}

export const getURLSearchParams = (key, defualt = null) => {
    let params = initURLSearchParams()
    return params.get(key) || defualt
}

export const setURLSearchParams = (key, value) => {
    let params = initURLSearchParams()
    return params.set(key, value)
}
