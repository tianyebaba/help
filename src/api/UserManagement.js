import request from '@/utils/request'

export function fetchUserList(query) {
  return request({
    url: '/worker/getAll',
    method: 'get',
    // params: query,
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}

export function createUser(data) {
  return request({
    url: '/worker/addWorker',
    method: 'post',
    params: { account: data.account, password: data.password, age: data.age, name: data.name, phone: data.phone },
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}

export function deleteUser(id) {
  return request({
    url: '/worker/deleteWorker',
    method: 'post',
    params: { id },
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}

export function updateWork(data) {
  return request({
    url: '/worker/updateWorker',
    method: 'post',
    params: { id: data.id, account: data.account, password: data.password, age: data.age, name: data.name, phone: data.phone },
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}
