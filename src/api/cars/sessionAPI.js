import { API_BASE_URL } from '../core/apiConfig'
import { authAPI } from '../login/authAPI'

const BASE = `${API_BASE_URL}/session`

export const sessionAPI = {
  // GET /session/car/{car_id} - Get sessions for a car
  getSessionsForCar: (car_id) => {
    const token = authAPI.getToken()
    const tokenType = authAPI.getTokenType()

    return fetch(`${BASE}/car/${car_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${token}`
      }
    }).then(async (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.')
        }
        if (res.status === 404) {
          throw new Error('Aucune session trouvée pour cette voiture')
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to get sessions')
      }
      return res.json()
    })
  },

  // POST /session/create - Create a new session
  create: (sessionData) => {
    const token = authAPI.getToken()
    const tokenType = authAPI.getTokenType()

    return fetch(`${BASE}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `${tokenType} ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionData)
    }).then(async (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.')
        }
        if (res.status === 422) {
          const err = await res.json().catch(() => ({}))
          throw new Error('Erreur de validation: ' + (err.detail?.[0]?.msg || 'Données invalides'))
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to create session')
      }
      return res.json()
    })
  }
}

export default sessionAPI