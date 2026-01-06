import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { carAPI } from '../../../api'
import { authAPI } from '../../../api'
import { API_BASE_URL } from '../../../api/core/apiConfig'
import '../CarsPage.css'

const CreateCarModal = ({ isOpen, onClose, onCarCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    hours: 0,
    owner_id: '' // Changed from 'owner' to 'owner_id'
  })
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clients, setClients] = useState([])
  const [loadingClients, setLoadingClients] = useState(false)

  // Fetch clients when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchClients()
    }
  }, [isOpen])

  const fetchClients = async () => {
    setLoadingClients(true)
    setError('')
    
    try {
      const token = authAPI.getToken()
      const tokenType = authAPI.getTokenType()
      
      const response = await fetch(`${API_BASE_URL}/user/client/all`, {
        method: 'GET',
        headers: {
          'Authorization': `${tokenType} ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.')
        }
        throw new Error('Erreur lors du chargement des clients')
      }

      const data = await response.json()
      setClients(data)
    } catch (err) {
      console.error('Error fetching clients:', err)
      setError(err.message)
    } finally {
      setLoadingClients(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours' ? parseInt(value) || 0 : value
    }))
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name.trim()) {
      setError('Le nom de la voiture est requis')
      return
    }

    if (!formData.owner_id) {
      setError('Veuillez sélectionner un client')
      return
    }

    if (!file) {
      setError('Veuillez sélectionner une photo')
      return
    }

    try {
      setLoading(true)
      
      // Call the API with owner_id
      const result = await carAPI.create(
        formData.name,
        formData.hours,
        formData.owner_id, // Send the client ID
        file
      )

      console.log('Car created successfully:', result)
      
      // Call the callback to refresh the list
      if (onCarCreated) {
        onCarCreated(result)
      }

      // Reset form and close modal
      setFormData({ name: '', hours: 0, owner_id: '' })
      setFile(null)
      setFileName('')
      onClose()
    } catch (err) {
      console.error('Error creating car:', err)
      setError(err.message || 'Une erreur est survenue lors de la création')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: '', hours: 0, owner_id: '' })
      setFile(null)
      setFileName('')
      setError('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={handleClose}></div>
      <div className="scanner-container">
        <div className="scanner-header">
          <h2 className="scanner-title">Créer une Voiture</h2>
          <button className="close-button" onClick={handleClose} disabled={loading}>
            <X size={24} />
          </button>
        </div>
        
        <div className="scanner-content">
          {error && (
            <div style={{
              padding: '1rem',
              marginBottom: '1rem',
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Nom de la Voiture *
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Ferrari F40"
                disabled={loading}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Client *
              </label>
              {loadingClients ? (
                <div style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: '#f8fafc',
                  color: '#64748b'
                }}>
                  Chargement des clients...
                </div>
              ) : (
                <select
                  name="owner_id"
                  value={formData.owner_id}
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Heures d'utilisation
              </label>
              <input 
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Photo du véhicule *
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                disabled={loading}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label
                htmlFor="file-upload"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: '2px dashed #4D97D0',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  background: '#f8fafc',
                  transition: 'all 0.3s'
                }}
              >
                <Upload size={20} color="#4D97D0" />
                <span style={{ color: '#64748b' }}>
                  {fileName || 'Sélectionner une photo...'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || loadingClients}
              style={{
                width: '100%',
                background: (loading || loadingClients) ? '#94a3b8' : 'linear-gradient(135deg, #4D97D0, #6bb3e0)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: (loading || loadingClients) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite'
                  }}></div>
                  Création en cours...
                </>
              ) : (
                'Créer la Voiture'
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default CreateCarModal