import { X } from 'lucide-react'
import '../ComponentsPage.css'

const ListComponentsModal = ({ isOpen, onClose, components = [] }) => {
  if (!isOpen) return null

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={onClose}></div>
      <div className="scanner-container" style={{ maxWidth: '600px' }}>
        <div className="scanner-header">
          <h2 className="scanner-title">Lister des Composants</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="scanner-content">
          {components && components.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {components.map((component, index) => (
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
                    {component.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <strong>Référence:</strong> {component.reference}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    <strong>Description:</strong> {component.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <p>Aucun composant disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListComponentsModal