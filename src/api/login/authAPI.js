import { API_BASE_URL } from '../core/apiConfig'

const BASE = `${API_BASE_URL}/user`

export const authAPI = {
  // Login user with username and password
  login: (username, password) => {
    // Create URL-encoded form data
    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('grant_type', 'password')

    return fetch(`${BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    }).then(async (res) => {
      if (!res.ok) {
        // Handle different error status codes
        if (res.status === 401) {
          throw new Error('Identifiants incorrects')
        } else if (res.status === 422) {
          throw new Error('Format de données invalide')
        } else if (res.status === 404) {
          throw new Error('Service non disponible')
        } else if (res.status >= 500) {
          throw new Error('Erreur serveur. Veuillez réessayer plus tard.')
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || err.message || 'Une erreur est survenue lors de la connexion')
      }
      return res.json()
    }).catch((error) => {
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Impossible de se connecter au serveur')
      }
      throw error
    })
  },

  // Logout user (clear local storage)
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenType')
    localStorage.removeItem('user')
  },

  // Get stored auth token
  getToken: () => {
    return localStorage.getItem('authToken')
  },

  // Get token type
  getTokenType: () => {
    return localStorage.getItem('tokenType') || 'bearer'
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken')
    return !!token
  },

  // Get authorization header for authenticated requests
  getAuthHeaders: () => {
    const token = localStorage.getItem('authToken')
    const tokenType = localStorage.getItem('tokenType') || 'bearer'
    
    if (!token) {
      return {
        'Content-Type': 'application/json',
      }
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `${tokenType} ${token}`
    }
  },

  // Store auth data
  storeAuth: (access_token, token_type) => {
    localStorage.setItem('authToken', access_token)
    localStorage.setItem('tokenType', token_type)
  },

  // Store user data
  storeUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
  },

  // Get user data
  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

export default authAPI