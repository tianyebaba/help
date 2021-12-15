import request from '@/utils/request'

export function getNodeList(query) {
  return request({
    url: '/card/getAll',
    method: 'post',
    // params: query,
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}

export function createNode(data) {
  return request({
    url: '/card/addCard',
    method: 'post',
    params: { name: data.name, project: data.project },
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}

export function updateNode(data) {
  return request({
    url: '/card/updateCard',
    method: 'post',
    params: { id: data.id, name: data.name, project: data.project },
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}

export function deleteNode(data) {
  return request({
    url: '/card/deleteCard',
    method: 'post',
    params: { id: data.id },
    baseURL: 'http://39.107.112.109:8080/wildrescue'
  })
}
