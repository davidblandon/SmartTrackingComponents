import { API_BASE_URL } from '../core/apiConfig'
import { authAPI } from '../login/authAPI'

const BASE = `${API_BASE_URL}/maintenance`

export const maintenanceAPI = {
  // GET /maintenance/car/{car_id} - Get maintenances for a car
  getMaintenancesForCar: (car_id) => {
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
          throw new Error('Aucune maintenance trouvée pour cette voiture')
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to get maintenances')
      }
      return res.json()
    })
  },

  // POST /maintenance/create - Create a new maintenance
  create: (type, car_id, notes, file) => {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('car_id', car_id)
    if (notes) {
      formData.append('notes', notes)
    }
    if (file) {
      formData.append('file', file)
    }

    const token = authAPI.getToken()
    const tokenType = authAPI.getTokenType()

    return fetch(`${BASE}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `${tokenType} ${token}`
        // Don't include Content-Type - FormData sets it automatically
      },
      body: formData
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
        throw new Error(err.message || err.detail || 'Failed to create maintenance')
      }
      return res.json()
    })
  }
}

export default maintenanceAPI