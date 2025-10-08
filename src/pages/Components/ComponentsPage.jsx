import { Plus, ScanLine } from 'lucide-react'
import './ComponentsPage.css'

const ComponentsPage = () => {
  const handleCreateComponent = () => {
    console.log('Create component clicked')
    // Navigation logic will go here
  }

  const handleScanComponent = () => {
    console.log('Scan component clicked')
    // Navigation logic will go here
  }

  return (
    <div className="components-page">
      <div className="components-container">
        <h1 className="page-title">Gestion des Composants</h1>
        <p className="page-subtitle">Choisissez une action pour commencer</p>

        <div className="cards-grid">
          {/* Create Component Card */}
          <button className="action-card create-card" onClick={handleCreateComponent}>
            <div className="card-icon-wrapper create-icon">
              <div className="icon-glow"></div>
              <Plus className="card-icon" size={48} strokeWidth={2.5} />
            </div>
            <div className="card-content">
              <h2 className="card-title">Créer un Composant</h2>
              <p className="card-description">
                Ajouter un nouveau composant automobile au système
              </p>
            </div>
            <div className="card-footer">
              <span className="card-action">Commencer →</span>
            </div>
          </button>

          {/* Scan Component Card */}
          <button className="action-card scan-card" onClick={handleScanComponent}>
            <div className="card-icon-wrapper scan-icon">
              <div className="icon-glow"></div>
              <ScanLine className="card-icon" size={48} strokeWidth={2.5} />
            </div>
            <div className="card-content">
              <h2 className="card-title">Scanner un Composant</h2>
              <p className="card-description">
                Scanner et identifier un composant existant
              </p>
            </div>
            <div className="card-footer">
              <span className="card-action">Scanner →</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComponentsPage