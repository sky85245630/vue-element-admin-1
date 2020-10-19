import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // return Cookies.set("TOKEN", "")

  return Cookies.get("TOKEN")
}


export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function TOKEN(token) {
  return Cookies.set("TOKEN", token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
