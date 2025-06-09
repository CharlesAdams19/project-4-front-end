const tokenName = 'itinero-token'
const refreshTokenName = 'itinero-token-refresh'

export const setToken = (access, refresh) => {
    localStorage.setItem(tokenName, access)
    localStorage.setItem(refreshTokenName, refresh)
    console.log('Tokens stored')
}

export const getToken = () => {
    return localStorage.getItem(tokenName)
}

export const getRefreshToken = () => {
    return localStorage.getItem(refreshTokenName)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
    localStorage.removeItem(refreshTokenName)

}

export const getUserFromToken = () => {
    // Get token from locall storage
    const token = getToken()
    // Check if the token was defined, if not, return null
    if (!token) return null
    // If the user exists, we need to split(.) the token and get the
    // second string, this represents the user object
    const payload = token.split('.')[1]
    // Decode the data to get the user object
    const payloadAsObject = JSON.parse(atob(payload))
    // Check that the expiry date is valid
    const timeNow = Date.now() / 1000
    const expTime = payloadAsObject.exp
    // 6. If the token is expired - the expiry time(in seconds) is smaller than 
    // the time right now(in millseconds), remove it from storage, return null
    if (expTime < timeNow) {
        removeToken()
        console.log('Token removed')
        return null
    }
    // If the token is not expired, return user object
    return payloadAsObject.user
}