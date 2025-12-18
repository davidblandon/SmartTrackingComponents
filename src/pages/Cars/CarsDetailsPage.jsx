import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Package, AlertCircle, Loader } from 'lucide-react'
import { carAPI } from '../../api/'
import './CarsDetailsPage.css'

const CarDetailsPage = () => {
  const navigate = useNavigate()
  const { qrCode } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use the API configuration
        const data = await carAPI.getByQRCode(qrCode)
        console.log(data);
        setCar(data)
      } catch (err) {
        console.error('Error fetching car:', err)
        
        // Handle specific error messages
        if (err.message.includes('404')) {
          setError('Voiture non trouvé')
        } else if (err.message.includes('Failed to fetch')) {
          setError('Impossible de se connecter au serveur')
        } else {
          setError(err.message || 'Erreur lors du chargement du Voiture')
        }
      } finally {
        setLoading(false)
      }
    }

    if (qrCode) {
      fetchCarDetails()
    }
  }, [qrCode])

  const handleBack = () => {
    navigate(-1)
  }

  const handleScanAnother = () => {
    navigate('/cars')
  }

  if (loading) {
    return (
      <div className="car-details-page">
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
      <div className="car-details-page">
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
                Scanner une autre Voiture
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="car-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={24} />
            <span>Retour</span>
          </button>
        </div>

        {/* car Details Card */}
        <div className="details-card">
          <div className="card-header">
            <div className="header-icon">
              <Package size={40} />
            </div>
            <div className="header-content">
              <span className="car-badge">Voiture Automobile</span>
              <h1 className="car-title">{car?.name || 'Nom indisponible'}</h1>
            </div>
          </div>

          <div className="card-body">
            {/* Reference Section */}
            <div className="info-section">
              <h3 className="section-title">Référence</h3>
              <div className="info-value reference-value">
                {car?.reference || qrCode}
              </div>
            </div>

            {/* Description Section */}
            {car?.description && (
              <div className="info-section">
                <h3 className="section-title">Description</h3>
                <p className="info-value">{car.description}</p>
              </div>
            )}

            {/* Additional Details - Customize based on your API response */}
            {car?.category && (
              <div className="info-section">
                <h3 className="section-title">Catégorie</h3>
                <p className="info-value">{car.category}</p>
              </div>
            )}

            {car?.manufacturer && (
              <div className="info-section">
                <h3 className="section-title">Fabricant</h3>
                <p className="info-value">{car.manufacturer}</p>
              </div>
            )}

            {car?.status && (
              <div className="info-section">
                <h3 className="section-title">Statut</h3>
                <span className={`status-badge status-${car.status.toLowerCase()}`}>
                  {car.status}
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
              Scanner une autre voiture 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailsPage