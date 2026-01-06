import { API_BASE_URL } from '../core/apiConfig'
import { authAPI } from '../login/authAPI' // Import authAPI for authentication

const BASE = `${API_BASE_URL}/car`

export const carAPI = {
  // GET /car/{car_qr} - Get car by QR code
  getByQr: (car_qr) => {
    const token = authAPI.getToken()
    const tokenType = authAPI.getTokenType()

    return fetch(`${BASE}/${car_qr}`, {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${token}`
      }
    }).then(async (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.')
        }
        if (res.status === 422) {
          const err = await res.json().catch(() => ({}))
          throw new Error('Validation error: ' + (err.detail?.[0]?.msg || 'Invalid data'))
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to get car')
      }
      return res.json()
    })
  },

  // GET /car/all - Get all cars
  list: () => {
    const token = authAPI.getToken()
    const tokenType = authAPI.getTokenType()

    return fetch(`${BASE}/all`, {
      method: 'GET',
      headers: {
        'Authorization': `${tokenType} ${token}`
      }
    }).then(async (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.')
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to get cars')
      }
      return res.json()
    })
  },

  // POST /car/create/ - Create car with file upload
  create: (name, hours, owner_id, file) => {
    const formData = new FormData()
    formData.append("uploaded_file", file)

    const url = `${BASE}/create/?name=${encodeURIComponent(name)}&hours=${encodeURIComponent(hours)}&owner_id=${encodeURIComponent(owner_id)}`

    const token = authAPI.getToken()
    const tokenType = authAPI.getTokenType()

    return fetch(url, {
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
          throw new Error('Validation error: ' + (err.detail?.[0]?.msg || 'Invalid data'))
        }
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to create car')
      }
      return res.json()
    })
  }
}

export default carAPI