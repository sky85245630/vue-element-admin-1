import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mclub/login',
    // url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/adminMenu/router',
    method: 'post',
    header: {
      "Content-Type":"application/json",
    }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
