import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Package, AlertCircle, Loader, Clock, Calendar, Car as CarIcon } from 'lucide-react'
import { componentAPI } from '../../api/'
import { API_BASE_URL } from '../../api/core/apiConfig'
import './ComponentsDetailsPage.css'

const ComponentDetailsPage = () => {
  const navigate = useNavigate()
  const { qrCode } = useParams()
  const [component, setComponent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComponentDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use the API configuration
        const data = await componentAPI.getByQRCode(qrCode)
        console.log(data)
        setComponent(data)
      } catch (err) {
        console.error('Error fetching component:', err)
        
        // Handle specific error messages
        if (err.message.includes('404')) {
          setError('Composant non trouvé')
        } else if (err.message.includes('Failed to fetch')) {
          setError('Impossible de se connecter au serveur')
        } else {
          setError(err.message || 'Erreur lors du chargement du composant')
        }
      } finally {
        setLoading(false)
      }
    }

    if (qrCode) {
      fetchComponentDetails()
    }
  }, [qrCode])

  const handleBack = () => {
    navigate(-1)
  }

  const handleScanAnother = () => {
    navigate('/components')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Non défini'
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="component-details-page">
        <div className="details-container">
          <div className="loading-container">
            <Loader className="loading-spinner" size={48} />
            <h2>Chargement des détails...</h2>
            <p>Veuillez patienter</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="component-details-page">
        <div className="details-container">
          <div className="error-container">
            <AlertCircle className="error-icon" size={64} />
            <h2>Erreur</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button className="btn-secondary" onClick={handleBack}>
                <ArrowLeft size={20} />
                Retour
              </button>
              <button className="btn-primary" onClick={handleScanAnother}>
                Scanner un autre composant
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="component-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={24} />
            <span>Retour</span>
          </button>
        </div>

        {/* Component Details Card */}
        <div className="details-card">
          <div className="card-header">
            <div className="header-icon">
              <Package size={40} />
            </div>
            <div className="header-content">
              <span className="component-badge">{component?.nature || 'Composant'}</span>
              <h1 className="component-title">{component?.name || 'Nom indisponible'}</h1>
            </div>
          </div>

          <div className="card-body">
            {/* Photo Section */}
            {component?.photo && (
              <div className="info-section">
                <h3 className="section-title">Photo du composant</h3>
                <img
                  src={`${API_BASE_URL}/${component.photo}`}
                  alt={component.name || "Composant"}
                  style={{ 
                    maxWidth: '250px', 
                    maxHeight: '250px',
                    width: 'auto',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Image non disponible</text></svg>'
                  }}
                />
              </div>
            )}

            {/* Nature Section */}
            {component?.nature && (
              <div className="info-section">
                <h3 className="section-title">Type de composant</h3>
                <span className="status-badge">
                  {component.nature}
                </span>
              </div>
            )}

            {/* Operating Hours Section */}
            {component?.operating_hours !== undefined && (
              <div className="info-section">
                <h3 className="section-title">
                  <Clock size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                  Heures de fonctionnement
                </h3>
                <p className="info-value">{component.operating_hours.toLocaleString()} heures</p>
              </div>
            )}

            {/* Commissioning Date Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Date de mise en service
              </h3>
              <p className="info-value">{formatDate(component?.commissioning_date)}</p>
            </div>

            {/* Decommissioning Date Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Date de mise hors service
              </h3>
              <p className="info-value">{formatDate(component?.decommissioning_date)}</p>
            </div>

            {/* Car ID Section */}
            {component?.car_id && (
              <div className="info-section">
                <h3 className="section-title">
                  <CarIcon size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                  Véhicule associé
                </h3>
                <p className="info-value">
                  <code style={{ fontSize: '0.9rem', color: '#64748b' }}>{component.car_id}</code>
                </p>
              </div>
            )}

            {/* QR Code Section */}
            {component?.component_qr && (
              <div className="info-section">
                <h3 className="section-title">Code QR</h3>
                <div style={{ marginBottom: '10px' }}>
                  <img
                    src={`${API_BASE_URL}/static/components/qrcodes/${component.component_qr}.png`}
                    alt="QR Code"
                    style={{ 
                      maxWidth: '150px', 
                      maxHeight: '150px',
                      width: 'auto',
                      height: 'auto',
                      borderRadius: '8px',
                      objectFit: 'contain',
                      display: 'block',
                      border: '2px solid #e5e7eb',
                      padding: '8px',
                      background: 'white'
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect width="150" height="150" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">QR non disponible</text></svg>'
                    }}
                  />
                </div>
                <div className="qr-code-display">
                  <code>{component.component_qr}</code>
                </div>
              </div>
            )}

            {/* ID Section */}
            {component?.id && (
              <div className="info-section">
                <h3 className="section-title">Identifiant</h3>
                <div className="info-value">
                  <code style={{ fontSize: '0.9rem', color: '#64748b' }}>{component.id}</code>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="card-footer">
            <button className="btn-secondary" onClick={handleBack}>
              <ArrowLeft size={20} />
              Retour
            </button>
            <button className="btn-primary" onClick={handleScanAnother}>
              Scanner un autre composant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentDetailsPage