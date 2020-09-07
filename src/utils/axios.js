import Axios from "axios";
import { generateRequestId } from './utils';
import NProgress from './nprogress';

Axios.defaults.headers = {
  'Content-Type': 'application/json'
}

Axios.interceptors.request.use((config) => {
  NProgress.start()
  const token = localStorage.getItem('token') || ''
  config.headers.requestId = generateRequestId(24)
  config.headers.Authorization = `bearer ${token}`
  return config
}, (error) => {
  setTimeout(() => { NProgress.done() } , 2000)
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  NProgress.done()
  return response
}, (error) => {
  setTimeout(() => {NProgress.done()}, 2000)
  return Promise.reject(error)
})

export default Axios