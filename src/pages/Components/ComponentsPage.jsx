import { useState } from 'react'
import { Plus, ScanLine, X, List } from 'lucide-react'
import ScannerModal from './modals/ScannerModal'
import ResultModal from './modals/ResultModal'
import CreateComponentModal from './modals/CreateComponentModal'
import ListComponentsModal from './modals/ListComponentsModal'
import './ComponentsPage.css'

const ComponentsPage = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  // Sample data for list modal (replace with actual data from API)
  const [components] = useState([
    {
      name: 'Moteur V6',
      reference: 'ENG-2024-001',
      description: 'Moteur à essence V6 3.0L'
    },
    {
      name: 'Boîte de vitesses',
      reference: 'TRANS-2024-001',
      description: 'Boîte de vitesses automatique 8 vitesses'
    }
  ])

  const handleCreateComponent = () => {
    console.log('Create component clicked')
    setIsCreateModalOpen(true)
  }

  const handleListComponent = () => {
    console.log('List components clicked')
    setIsListModalOpen(true)
  }

  const handleScanComponent = () => {
    console.log('Scan component clicked')
    setIsScanning(true)
    setScannedData(null)
  }

  const handleCloseScan = () => {
    setIsScanning(false)
  }

  const handleScanSuccess = (data) => {
    setScannedData(data)
  }

  const handleCloseResult = () => {
    setScannedData(null)
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

      <ResultModal 
        isOpen={scannedData !== null} 
        onClose={handleCloseResult}
        data={scannedData}
        title="QR Code Scanné"
      />

      <CreateComponentModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ListComponentsModal 
        isOpen={isListModalOpen} 
        onClose={() => setIsListModalOpen(false)}
        components={components}
      />
    </div>
  )
}

export default ComponentsPage