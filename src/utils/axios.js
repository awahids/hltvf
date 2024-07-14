import axios from 'axios'
import config from './config'

const baseAxios = axios.create(
  {
    baseURL: config.API_URL
  }
)

export { baseAxios }