import { API_BASE_URL } from '../core/apiConfig'
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

    const url = `${BASE}?name=${encodeURIComponent(name)}&nature=${encodeURIComponent(nature)}`

    return fetch(url, {
      method: 'POST',
      body: formData
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Failed to create component')
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