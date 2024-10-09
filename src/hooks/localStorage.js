export const setToken = (token) => {
    localStorage.setItem('meli_auth', JSON.stringify(token))

}
export const fetchToken = () => {
    return  JSON.parse(localStorage.getItem('meli_auth'))

}