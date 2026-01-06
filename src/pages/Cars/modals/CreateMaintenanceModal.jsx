import { useState } from 'react'
import { X, Loader, CheckCircle, Upload, FileText } from 'lucide-react'
import { maintenanceAPI } from '../../../api/cars/maintenanceAPI'
import './CreateMaintenanceModal.css'

const CreateMaintenanceModal = ({ isOpen, onClose, carId, onMaintenanceCreated }) => {
  const [formData, setFormData] = useState({
    type: '',
    notes: ''
  })
  const [file, setFile] = useState(null)
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    // Reset file input
    const fileInput = document.getElementById('maintenance-file')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await maintenanceAPI.create(
        formData.type,
        carId,
        formData.notes || '',
        file
      )
      
      // Reset form
      setFormData({
        type: '',
        notes: ''
      })
      setFile(null)

      // Notify parent and close
      if (onMaintenanceCreated) {
        onMaintenanceCreated(result)
      }
      onClose()
    } catch (err) {
      console.error('Error creating maintenance:', err)
      setError(err.message || 'Erreur lors de la création de la maintenance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="maintenance-modal">
      <div className="maintenance-overlay" onClick={onClose} />
      <div className="maintenance-modal-container">
        <div className="maintenance-modal-header">
          <h2 className="maintenance-modal-title">Créer une nouvelle maintenance</h2>
          <button className="maintenance-close-button" onClick={onClose} disabled={loading}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="maintenance-modal-content">
          {error && (
            <div className="maintenance-error">
              <p>{error}</p>
            </div>
          )}

          <div className="maintenance-form-group">
            <label htmlFor="type" className="maintenance-label">
              Type de maintenance <span className="required">*</span>
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="maintenance-input"
              placeholder="Ex: Révision, Réparation, Contrôle"
              required
              disabled={loading}
            />
          </div>

          <div className="maintenance-form-group">
            <label htmlFor="notes" className="maintenance-label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="maintenance-textarea"
              placeholder="Notes additionnelles (optionnel)"
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="maintenance-form-group">
            <label htmlFor="maintenance-file" className="maintenance-label">
              Fichier joint
            </label>
            
            {!file ? (
              <label htmlFor="maintenance-file" className="maintenance-file-upload">
                <input
                  type="file"
                  id="maintenance-file"
                  onChange={handleFileChange}
                  className="maintenance-file-input"
                  disabled={loading}
                />
                <div className="file-upload-content">
                  <Upload size={32} />
                  <span>Cliquez pour sélectionner un fichier</span>
                  <span className="file-upload-hint">PDF, images, documents</span>
                </div>
              </label>
            ) : (
              <div className="maintenance-file-selected">
                <FileText size={24} />
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
                <button
                  type="button"
                  className="file-remove-button"
                  onClick={handleRemoveFile}
                  disabled={loading}
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="maintenance-modal-footer">
            <button
              type="button"
              className="maintenance-btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="maintenance-btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="maintenance-spinner" size={20} />
                  Création...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Créer la maintenance
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateMaintenanceModal