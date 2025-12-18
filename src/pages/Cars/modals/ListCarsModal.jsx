import { X } from 'lucide-react'
import '../CarsPage.css'

const ListCarsModal = ({ isOpen, onClose, cars = [] }) => {
  if (!isOpen) return null

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={onClose}></div>
      <div className="scanner-container" style={{ maxWidth: '600px' }}>
        <div className="scanner-header">
          <h2 className="scanner-title">Lister des Voitures</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="scanner-content">
          {cars && cars.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {cars.map((car, index) => (
                <div
                  key={index}
                  style={{
                    background: '#f9fafb',
                    padding: '1rem',
                    marginBottom: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb'
                  }}
                >
                  <h3 style={{ color: '#0A1F56', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {car.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <strong>Référence:</strong> {car.reference}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    <strong>Description:</strong> {car.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <p>Aucune voiture disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListCarsModal