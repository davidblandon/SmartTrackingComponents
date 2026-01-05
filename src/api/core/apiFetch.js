// core/apiFetch.js
import { authAPI } from '../login/authAPI'

export const apiFetch = async (url, options = {}) => {
  const config = {
    ...options,
    headers: {
      ...authAPI.getAuthHeaders(),
      ...options.headers,
    },
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      authAPI.logout()
      window.location.href = '/login'
    }
    
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}