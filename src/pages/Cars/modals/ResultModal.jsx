import { X } from 'lucide-react'
import '../CarsPage.css'

const ResultModal = ({ isOpen, onClose, data, title = "QR Code Scanné" }) => {
  if (!isOpen || !data) return null

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={onClose}></div>
      <div className="result-container">
        <div className="scanner-header">
          <h2 className="scanner-title">{title}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="result-content">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="result-label">Données du QR Code :</p>
          <div className="result-data">{data}</div>
          <button className="result-button" onClick={onClose}>
            Continuer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal