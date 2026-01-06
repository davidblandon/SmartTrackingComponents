import { API_BASE_URL } from '../core/apiConfig'
import { authAPI } from '../login/authAPI' // Import your authAPI
import { apiFetch } from '../core/apiFetch'


const BASE = `${API_BASE_URL}/component`


export const componentAPI = {
  // Get component by ID or QR
  getByQRCode: (qrCode) => {
    return apiFetch(`${API_BASE_URL}/component/${qrCode}`)
    },


  // List all components
  list: () => apiFetch(`${BASE}/all`),

    // Create component
    
  create: (name, nature, file) => {
    const formData = new FormData()
    formData.append("Uploaded_file", file)

    const url = `${BASE}/create/?name=${encodeURIComponent(name)}&nature=${encodeURIComponent(nature)}`

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
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || err.detail || 'Failed to create component')
      }
      return res.json()
    })
},



  // Update component
  update: (id, data) =>
    apiFetch(`${BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete component
  delete: (id) =>
    apiFetch(`${BASE}/${id}`, {
      method: 'DELETE',
    }),
}

export default componentAPI