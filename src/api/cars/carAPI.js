import { API_BASE_URL } from '../core/apiConfig'
import { apiFetch } from '../core/apiFetch'

const BASE = `${API_BASE_URL}/car`

export const carAPI = {
  getById: (id) => apiFetch(`${BASE}/${id}`),
  list: () => apiFetch(`${BASE}s`),
  create: (data) => apiFetch(BASE, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`${BASE}/${id}`, { method: 'DELETE' }),
}

export default carAPI
