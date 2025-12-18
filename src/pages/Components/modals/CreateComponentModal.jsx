import { useState } from 'react'
import { X } from 'lucide-react'
import '../ComponentsPage.css'
import { componentAPI } from '../../../api'

const NATURES = [
  "BMS", "VCU", "DC/dc", "Chargeur", 
  "Boite de jonction", "Module de batterie", 
  "Groupe moteur-onduleur", "Moteur", "Onduleur"
]

const CreateComponentModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("")
  const [nature, setNature] = useState("BMS")
  const [file, setFile] = useState(null)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !nature || !file) {
      alert("Name, nature and file are required.")
      return
    }

    try {
      await componentAPI.create(name, nature, file)
      onClose()
    } catch (error) {
      console.error(error)
      alert("Error while creating component.")
    }
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            {/* name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56' }}>
                Nom du Composant *
              </label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez le nom"
                style={inputStyle}
              />
            </div>

            {/* nature */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56' }}>
                Nature *
              </label>
              <select
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                style={inputStyle}
              >
                {NATURES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* file */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#0A1F56' }}>
                Fichier *
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={inputStyle}
              />
            </div>

            <button type="submit" style={buttonStyle}>
              Créer le Composant
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '1rem'
}

const buttonStyle = {
  width: '100%',
  background: 'linear-gradient(135deg, #4D97D0, #6bb3e0)',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  padding: '1rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer'
}

export default CreateComponentModal
