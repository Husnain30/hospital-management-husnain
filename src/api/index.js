import axios from 'axios'

const api = axios.create({
  baseURL: 'http://51.20.69.6:8080/api/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Optional: log responses for debugging
    console.log(`Response ${response.status}:`, response.data)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data)
      if (error.response.status === 401) {
        console.warn('Unauthorized — redirecting to login...')
        // Optional: clear token and redirect
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } else {
      console.error('Network or server error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api




