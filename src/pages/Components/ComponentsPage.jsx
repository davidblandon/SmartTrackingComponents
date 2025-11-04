import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ScanLine, List } from 'lucide-react'
import ScannerModal from './modals/ScannerModal'
import CreateComponentModal from './modals/CreateComponentModal'
import './ComponentsPage.css'

const ComponentsPage = () => {
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreateComponent = () => {
    console.log('Create component clicked')
    setIsCreateModalOpen(true)
  }

  const handleListComponent = () => {
    console.log('List components clicked')
    // Navigate to the components list page
    navigate('/components/list')
  }

  const handleScanComponent = () => {
    console.log('Scan component clicked')
    setIsScanning(true)
  }

  const handleCloseScan = () => {
    setIsScanning(false)
  }

  const handleScanSuccess = (data) => {
    console.log('Scanned QR Code:', data)
    // Redirect to component details page with the scanned QR code
    navigate(`/components/details/${encodeURIComponent(data)}`)
  }

  const handleCloseResult = () => {
    setIsScanning(false)
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

          {/* List Component Card */}
          <button className="action-card list-card" onClick={handleListComponent}>
            <div className="card-icon-wrapper list-icon">
              <div className="icon-glow"></div>
              <List className="card-icon" size={48} strokeWidth={2.5} />
            </div>
            <div className="card-content">
              <h2 className="card-title">Lister des Composants</h2>
              <p className="card-description">
                Lister tous les composants existants actuellement
              </p>
            </div>
            <div className="card-footer">
              <span className="card-action">Voir →</span>
            </div>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ScannerModal 
        isOpen={isScanning} 
        onClose={handleCloseScan}
        onSuccess={handleScanSuccess}
      />

      <CreateComponentModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

export default ComponentsPage