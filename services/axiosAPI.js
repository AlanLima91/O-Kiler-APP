import axios from 'axios'
import { API_URL } from './constant'

let token

export const setAxiosToken = (newToken) => {
  token = newToken
}

const getBearer = () => {
  if (!token) {
    setAxiosToken('default')
  }
  return token
}

const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000
})

apiInstance.interceptors.request.use((config) => {
  const overwrite = { ...config }
  overwrite.headers.Authorization = `Bearer ${getBearer()}`
  return overwrite
})

export default apiInstance
