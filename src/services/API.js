import axios from 'axios'

export default axios.create({
  baseURL: 'https://lagunalink-be.herokuapp.com',
  responseType: 'json'
})
