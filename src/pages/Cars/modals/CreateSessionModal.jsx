import { useState } from 'react'
import { X, Loader, CheckCircle } from 'lucide-react'
import { sessionAPI } from '../../../api/cars/sessionAPI'
import './CreateSessionModal.css'

const CreateSessionModal = ({ isOpen, onClose, carId, onSessionCreated }) => {
  const [formData, setFormData] = useState({
    heures: '',
    circuit: '',
    climat: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const sessionData = {
        heures: parseFloat(formData.heures) || 0,
        circuit: formData.circuit,
        climat: formData.climat,
        notes: formData.notes || '',
        car_id: carId
      }

      const result = await sessionAPI.create(sessionData)
      
      // Reset form
      setFormData({
        heures: '',
        circuit: '',
        climat: '',
        notes: ''
      })

      // Notify parent and close
      if (onSessionCreated) {
        onSessionCreated(result)
      }
      onClose()
    } catch (err) {
      console.error('Error creating session:', err)
      setError(err.message || 'Erreur lors de la création de la session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="session-modal">
      <div className="session-overlay" onClick={onClose} />
      <div className="session-modal-container">
        <div className="session-modal-header">
          <h2 className="session-modal-title">Créer une nouvelle session</h2>
          <button className="session-close-button" onClick={onClose} disabled={loading}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="session-modal-content">
          {error && (
            <div className="session-error">
              <p>{error}</p>
            </div>
          )}

          <div className="session-form-group">
            <label htmlFor="heures" className="session-label">
              Heures <span className="required">*</span>
            </label>
            <input
              type="number"
              id="heures"
              name="heures"
              value={formData.heures}
              onChange={handleChange}
              className="session-input"
              placeholder="0"
              min="0"
              step="0.1"
              required
              disabled={loading}
            />
          </div>

          <div className="session-form-group">
            <label htmlFor="circuit" className="session-label">
              Circuit <span className="required">*</span>
            </label>
            <input
              type="text"
              id="circuit"
              name="circuit"
              value={formData.circuit}
              onChange={handleChange}
              className="session-input"
              placeholder="Nom du circuit"
              required
              disabled={loading}
            />
          </div>

          <div className="session-form-group">
            <label htmlFor="climat" className="session-label">
              Climat <span className="required">*</span>
            </label>
            <input
              type="text"
              id="climat"
              name="climat"
              value={formData.climat}
              onChange={handleChange}
              className="session-input"
              placeholder="Ex: Ensoleillé, Pluvieux, Nuageux"
              required
              disabled={loading}
            />
          </div>

          <div className="session-form-group">
            <label htmlFor="notes" className="session-label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="session-textarea"
              placeholder="Notes additionnelles (optionnel)"
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="session-modal-footer">
            <button
              type="button"
              className="session-btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="session-btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="session-spinner" size={20} />
                  Création...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Créer la session
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSessionModal