import { X } from 'lucide-react'
import '../ComponentsPage.css'

const CreateComponentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add form submission logic here
    console.log('Form submitted')
    onClose()
  }

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={onClose}></div>
      <div className="scanner-container">
        <div className="scanner-header">
          <h2 className="scanner-title">Créer un Composant</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="scanner-content">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Nom du Composant
              </label>
              <input 
                type="text" 
                placeholder="Entrez le nom du composant"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Référence
              </label>
              <input 
                type="text" 
                placeholder="Entrez la référence"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Description
              </label>
              <textarea 
                placeholder="Entrez la description du composant"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minHeight: '100px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #4D97D0, #6bb3e0)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Créer le Composant
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateComponentModal