import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function QQ(token) {
  return Cookies.set("cookieQQ", token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
