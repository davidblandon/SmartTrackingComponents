import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Car as CarIcon, AlertCircle, Loader, User, Clock, Calendar, Plus, Wrench, Download } from 'lucide-react'
import { carAPI } from '../../api/'
import { sessionAPI } from '../../api/cars/sessionAPI'
import { maintenanceAPI } from '../../api/cars/maintenanceAPI'
import { API_BASE_URL } from '../../api/core/apiConfig'
import CreateSessionModal from './modals/CreateSessionModal'
import CreateMaintenanceModal from './modals/CreateMaintenanceModal'
import './CarsDetailsPage.css'

const CarDetailsPage = () => {
  const navigate = useNavigate()
  const { qrCode } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Sessions state
  const [showSessions, setShowSessions] = useState(false)
  const [sessions, setSessions] = useState([])
  const [sessionsLoading, setSessionsLoading] = useState(false)
  const [sessionsError, setSessionsError] = useState(null)
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false)

  // Maintenances state
  const [showMaintenances, setShowMaintenances] = useState(false)
  const [maintenances, setMaintenances] = useState([])
  const [maintenancesLoading, setMaintenancesLoading] = useState(false)
  const [maintenancesError, setMaintenancesError] = useState(null)
  const [isCreateMaintenanceModalOpen, setIsCreateMaintenanceModalOpen] = useState(false)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await carAPI.getByQr(qrCode)
        console.log(data)
        setCar(data)
      } catch (err) {
        console.error('Error fetching car:', err)
        
        if (err.message.includes('404')) {
          setError('Voiture non trouvée')
        } else if (err.message.includes('Failed to fetch')) {
          setError('Impossible de se connecter au serveur')
        } else {
          setError(err.message || 'Erreur lors du chargement de la voiture')
        }
      } finally {
        setLoading(false)
      }
    }

    if (qrCode) {
      fetchCarDetails()
    }
  }, [qrCode])

  const fetchSessions = async () => {
    if (!car?.id) return

    try {
      setSessionsLoading(true)
      setSessionsError(null)
      const data = await sessionAPI.getSessionsForCar(car.id)
      setSessions(data)
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setSessionsError(err.message || 'Erreur lors du chargement des sessions')
      setSessions([])
    } finally {
      setSessionsLoading(false)
    }
  }

  const fetchMaintenances = async () => {
    if (!car?.id) return

    try {
      setMaintenancesLoading(true)
      setMaintenancesError(null)
      const data = await maintenanceAPI.getMaintenancesForCar(car.id)
      setMaintenances(data)
    } catch (err) {
      console.error('Error fetching maintenances:', err)
      setMaintenancesError(err.message || 'Erreur lors du chargement des maintenances')
      setMaintenances([])
    } finally {
      setMaintenancesLoading(false)
    }
  }

  const handleShowSessions = async () => {
    setShowSessions(true)
    await fetchSessions()
  }

  const handleShowMaintenances = async () => {
    setShowMaintenances(true)
    await fetchMaintenances()
  }

  const handleSessionCreated = async (newSession) => {
    await fetchSessions()
  }

  const handleMaintenanceCreated = async (newMaintenance) => {
    await fetchMaintenances()
  }

  const handleDownloadFile = (filePath) => {
    if (!filePath) return
    const fileUrl = `${API_BASE_URL}/${filePath}`
    window.open(fileUrl, '_blank')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
                Scanner une autre voiture
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

        {/* Car Details Card */}
        <div className="details-card">
          <div className="card-header">
            <div className="header-icon">
              <CarIcon size={40} />
            </div>
            <div className="header-content">
              <span className="car-badge">Véhicule</span>
              <h1 className="car-title">{car?.name || 'Nom indisponible'}</h1>
            </div>
          </div>

          <div className="card-body">
            {/* Photo Section */}
            {car?.photo_path && (
              <div className="info-section">
                <h3 className="section-title">Photo du véhicule</h3>
                <img
                  src={`${API_BASE_URL}/${car.photo_path}`}
                  alt={car.name || "Véhicule"}
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

            {/* Owner Section */}
            {car?.owner && (
              <div className="info-section">
                <h3 className="section-title">
                  <User size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                  Client
                </h3>
                <p className="info-value">{car.owner}</p>
              </div>
            )}

            {/* Hours Section */}
            {car?.hours !== undefined && (
              <div className="info-section">
                <h3 className="section-title">
                  <Clock size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                  Heures d'utilisation
                </h3>
                <p className="info-value">{car.hours.toLocaleString()} heures</p>
              </div>
            )}

            {/* Sessions Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Sessions
              </h3>
              
              {!showSessions ? (
                <button className="btn-sessions" onClick={handleShowSessions}>
                  Afficher sessions
                </button>
              ) : (
                <>
                  <button className="btn-create-session" onClick={() => setIsCreateSessionModalOpen(true)}>
                    <Plus size={20} />
                    Créer une session
                  </button>

                  {sessionsLoading ? (
                    <div className="sessions-loading">
                      <Loader className="loading-spinner" size={24} />
                      <p>Chargement des sessions...</p>
                    </div>
                  ) : sessionsError ? (
                    <div className="sessions-error">
                      <AlertCircle size={20} />
                      <p>{sessionsError}</p>
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="sessions-empty">
                      <p>Aucune session enregistrée pour cette voiture</p>
                    </div>
                  ) : (
                    <div className="sessions-list">
                      {sessions.map((session, index) => (
                        <div key={session.id || index} className="session-item">
                          <div className="session-header">
                            <span className="session-circuit">{session.circuit}</span>
                            <span className="session-hours">{session.heures}h</span>
                          </div>
                          <div className="session-info">
                            <span className="session-climat">
                              <strong>Climat:</strong> {session.climat}
                            </span>
                            {session.notes && (
                              <p className="session-notes">{session.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Maintenances Section */}
            <div className="info-section">
              <h3 className="section-title">
                <Wrench size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Maintenances
              </h3>
              
              {!showMaintenances ? (
                <button className="btn-maintenances" onClick={handleShowMaintenances}>
                  Afficher maintenances
                </button>
              ) : (
                <>
                  <button className="btn-create-maintenance" onClick={() => setIsCreateMaintenanceModalOpen(true)}>
                    <Plus size={20} />
                    Créer une maintenance
                  </button>

                  {maintenancesLoading ? (
                    <div className="maintenances-loading">
                      <Loader className="loading-spinner" size={24} />
                      <p>Chargement des maintenances...</p>
                    </div>
                  ) : maintenancesError ? (
                    <div className="maintenances-error">
                      <AlertCircle size={20} />
                      <p>{maintenancesError}</p>
                    </div>
                  ) : maintenances.length === 0 ? (
                    <div className="maintenances-empty">
                      <p>Aucune maintenance enregistrée pour cette voiture</p>
                    </div>
                  ) : (
                    <div className="maintenances-list">
                      {maintenances.map((maintenance, index) => (
                        <div key={maintenance.id || index} className="maintenance-item">
                          <div className="maintenance-header">
                            <span className="maintenance-type">{maintenance.type}</span>
                            <span className="maintenance-date">{formatDate(maintenance.maintenance_date)}</span>
                          </div>
                          <div className="maintenance-info">
                            {maintenance.notes && (
                              <p className="maintenance-notes">{maintenance.notes}</p>
                            )}
                            {maintenance.files && (
                              <button 
                                className="maintenance-download-btn"
                                onClick={() => handleDownloadFile(maintenance.files)}
                              >
                                <Download size={16} />
                                Voir le fichier
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* QR Code Section */}
            {car?.car_qr && (
              <div className="info-section">
                <h3 className="section-title">Code QR</h3>
                <div style={{ marginBottom: '10px' }}>
                  <img
                    src={`${API_BASE_URL}/static/cars/qrcodes/${car.car_qr}.png`}
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
                  <code>{car.car_qr}</code>
                </div>
              </div>
            )}

            {/* ID Section */}
            {car?.id && (
              <div className="info-section">
                <h3 className="section-title">Identifiant</h3>
                <div className="info-value">
                  <code style={{ fontSize: '0.9rem', color: '#64748b' }}>{car.id}</code>
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
              Scanner une autre voiture 
            </button>
          </div>
        </div>
      </div>

      {/* Create Session Modal */}
      <CreateSessionModal
        isOpen={isCreateSessionModalOpen}
        onClose={() => setIsCreateSessionModalOpen(false)}
        carId={car?.id}
        onSessionCreated={handleSessionCreated}
      />

      {/* Create Maintenance Modal */}
      <CreateMaintenanceModal
        isOpen={isCreateMaintenanceModalOpen}
        onClose={() => setIsCreateMaintenanceModalOpen(false)}
        carId={car?.id}
        onMaintenanceCreated={handleMaintenanceCreated}
      />
    </div>
  )
}

export default CarDetailsPage