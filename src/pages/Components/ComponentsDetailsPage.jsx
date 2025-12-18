import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Package, AlertCircle, Loader, FileText, Image } from 'lucide-react'
import { componentAPI } from '../../api/'
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
        const data = await componentAPI.getByQRCode(qrCode)
        setComponent(data)
      } catch (err) {
        console.error('Error fetching component:', err)
        if (err.message.includes('404')) setError('Composant non trouvé')
        else if (err.message.includes('Failed to fetch')) setError('Impossible de se connecter au serveur')
        else setError(err.message || 'Erreur lors du chargement du composant')
      } finally {
        setLoading(false)
      }
    }

    if (qrCode) fetchComponentDetails()
  }, [qrCode])

  const handleBack = () => navigate(-1)
  const handleScanAnother = () => navigate('/components')

  if (loading)
    return (
      <div className="component-details-page">
        <div className="details-container loading-container">
          <Loader size={48} className="loading-spinner" />
          <h2>Chargement des détails...</h2>
          <p>Veuillez patienter</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="component-details-page">
        <div className="details-container error-container">
          <AlertCircle size={64} className="error-icon" />
          <h2>Erreur</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button className="btn-secondary" onClick={handleBack}>
              <ArrowLeft size={20} /> Retour
            </button>
            <button className="btn-primary" onClick={handleScanAnother}>
              Scanner un autre composant
            </button>
          </div>
        </div>
      </div>
    )

  return (
    <div className="component-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={24} /> <span>Retour</span>
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
            {/* Name */}
            <div className="info-section">
              <h3 className="section-title">Nom</h3>
              <p className="info-value">{component?.name}</p>
            </div>

            {/* Nature */}
            <div className="info-section">
              <h3 className="section-title">Nature</h3>
              <p className="info-value">{component?.nature}</p>
            </div>

            {/* Uploaded_file */}
            <div className="info-section">
              <h3 className="section-title">Fichier</h3>
              {component?.Uploaded_file ? (
                component.Uploaded_file.endsWith('.png') ||
                component.Uploaded_file.endsWith('.jpg') ||
                component.Uploaded_file.endsWith('.jpeg') ? (
                  <img
                    src={component.Uploaded_file}
                    alt="Composant"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                ) : (
                  <a href={component.Uploaded_file} target="_blank" rel="noreferrer" className="file-link">
                    <FileText size={20} /> Télécharger le fichier
                  </a>
                )
              ) : (
                <span>Aucun fichier disponible</span>
              )}
            </div>

            {/* QR Code Info */}
            <div className="info-section qr-section">
              <h3 className="section-title">Code QR Scanné</h3>
              <code>{qrCode}</code>
            </div>
          </div>

          {/* Actions */}
          <div className="card-footer">
            <button className="btn-secondary" onClick={handleBack}>
              <ArrowLeft size={20} /> Retour
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
