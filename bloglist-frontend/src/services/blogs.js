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

// POST new blog to server
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken }