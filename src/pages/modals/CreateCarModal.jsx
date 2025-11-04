import { X } from 'lucide-react'
import '../Cars/CarsPage.css'

const CreateCarModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const carData = {
      marque: formData.get('marque'),
      modele: formData.get('modele'),
      immatriculation: formData.get('immatriculation'),
      description: formData.get('description')
    }
    
    if (onSubmit) {
      onSubmit(carData)
    }
    
    e.target.reset()
    onClose()
  }

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={onClose}></div>
      <div className="scanner-container">
        <div className="scanner-header">
          <h2 className="scanner-title">Créer une Voiture</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="scanner-content">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56', fontWeight: '500' }}>
                Marque
              </label>
              <input 
                type="text"
                name="marque"
                placeholder="Entrez la marque de la voiture"
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
                Modèle
              </label>
              <input 
                type="text"
                name="modele"
                placeholder="Entrez le modèle de la voiture"
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
                Immatriculation
              </label>
              <input 
                type="text"
                name="immatriculation"
                placeholder="Entrez l'immatriculation"
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
                name="description"
                placeholder="Entrez la description de la voiture"
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
              Créer la Voiture
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCarModal