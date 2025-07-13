import axios from 'axios'


const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:3001" : "";
const apiRequest = axios.create({
  baseURL : BASE_URL,
  withCredentials:true,
})

export default apiRequest;