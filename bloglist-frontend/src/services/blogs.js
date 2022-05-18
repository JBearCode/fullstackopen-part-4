import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// set authorization header required by backend
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// return all blogs from server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// POST new blog to server
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// update blog likes
const update = async ( id, updatedObject ) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

export default { getAll, getOne, create, setToken, update }