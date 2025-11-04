import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Package, AlertCircle, Loader } from 'lucide-react'
import { componentAPI } from '../../api/config'
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
        console.log(data);
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
              <span className="component-badge">Composant Automobile</span>
              <h1 className="component-title">{component?.name || 'Nom indisponible'}</h1>
            </div>
          </div>

          <div className="card-body">
            {/* Reference Section */}
            <div className="info-section">
              <h3 className="section-title">Référence</h3>
              <div className="info-value reference-value">
                {component?.reference || qrCode}
              </div>
            </div>

            {/* Description Section */}
            {component?.description && (
              <div className="info-section">
                <h3 className="section-title">Description</h3>
                <p className="info-value">{component.description}</p>
              </div>
            )}

            {/* Additional Details - Customize based on your API response */}
            {component?.category && (
              <div className="info-section">
                <h3 className="section-title">Catégorie</h3>
                <p className="info-value">{component.category}</p>
              </div>
            )}

            {component?.manufacturer && (
              <div className="info-section">
                <h3 className="section-title">Fabricant</h3>
                <p className="info-value">{component.manufacturer}</p>
              </div>
            )}

            {component?.status && (
              <div className="info-section">
                <h3 className="section-title">Statut</h3>
                <span className={`status-badge status-${component.status.toLowerCase()}`}>
                  {component.status}
                </span>
              </div>
            )}

            {/* QR Code Info */}
            <div className="info-section qr-section">
              <h3 className="section-title">Code QR Scanné</h3>
              <div className="qr-code-display">
                <code>{qrCode}</code>
              </div>
            </div>
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