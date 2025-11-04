// API Configuration
const API_BASE_URL = 'https://192.168.1.180:8000'

// API Endpoints
export const API_ENDPOINTS = {
  getComponent: (qrCode) => `${API_BASE_URL}/composant/${qrCode}`,
  listComponents: () => `${API_BASE_URL}/composants`,
  createComponent: () => `${API_BASE_URL}/composant`,
  updateComponent: (id) => `${API_BASE_URL}/composant/${id}`,
  deleteComponent: (id) => `${API_BASE_URL}/composant/${id}`,
}

// Fetch helper with error handling
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Fetch Error:', error)
    throw error
  }
}

// Component API functions
export const componentAPI = {
  // Get component by QR code
  getByQRCode: async (qrCode) => {
    console.log(qrCode);
    const url = API_ENDPOINTS.getComponent(qrCode)
    console.log("Fetching:", url)
    return apiFetch(url)
  },

  // List all components
  list: async () => {
    return apiFetch(API_ENDPOINTS.listComponents())
  },

  // Create new component
  create: async (componentData) => {
    return apiFetch(API_ENDPOINTS.createComponent(), {
      method: 'POST',
      body: JSON.stringify(componentData),
    })
  },

  // Update component
  update: async (id, componentData) => {
    return apiFetch(API_ENDPOINTS.updateComponent(id), {
      method: 'PUT',
      body: JSON.stringify(componentData),
    })
  },

  // Delete component
  delete: async (id) => {
    return apiFetch(API_ENDPOINTS.deleteComponent(id), {
      method: 'DELETE',
    })
  },
}

export default componentAPI