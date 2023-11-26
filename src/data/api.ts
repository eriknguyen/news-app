import axios, { AxiosError } from 'axios'

const DEFAULT_STALE_TIME = 10 * 60 * 1000 // 10 minute (in ms)

const api = axios.create({
  baseURL: 'https://newsapi.org/v2/',
})

// Interceptors to set default parameters, including the API key
api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  }
  return config
})

const getStatusCode = (error: AxiosError) => {
  if (error.response) {
    return error.response.status
  }

  // can consider return network error here
  // when this happen, there is no error.response
  return null
}

export { api, DEFAULT_STALE_TIME, getStatusCode }
