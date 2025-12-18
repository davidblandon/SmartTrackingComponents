import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ScanLine, List } from 'lucide-react'
import ScannerModal from './modals/ScannerModal'
import CreateCarModal from './modals/CreateCarModal'
import './CarsPage.css'

const CarsPage = () => {
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreateCar = () => {
    console.log('Create Car clicked')
    setIsCreateModalOpen(true)
  }

  const handleListCar = () => {
    console.log('List Cars clicked')
    // Navigate to the Cars list page
    navigate('/cars/list')
  }

  const handleScanCar = () => {
    console.log('Scan Car clicked')
    setIsScanning(true)
  }

  const handleCloseScan = () => {
    setIsScanning(false)
  }

  const handleScanSuccess = (data) => {
    console.log('Scanned QR Code:', data)
    // Redirect to Car details page with the scanned QR code
    navigate(`/cars/details/${encodeURICar(data)}`)
  }

  const handleCloseResult = () => {
    setIsScanning(false)
  }

  return (
    <div className="cars-page">
      <div className="cars-container">
        <h1 className="page-title">Gestion des Voitures</h1>
        <p className="page-subtitle">Choisissez une action pour commencer</p>

        <div className="cards-grid">
          {/* Create Car Card */}
          <button className="action-card create-card" onClick={handleCreateCar}>
            <div className="card-icon-wrapper create-icon">
              <div className="icon-glow"></div>
              <Plus className="card-icon" size={48} strokeWidth={2.5} />
            </div>
            <div className="card-content">
              <h2 className="card-title">Créer une Voitures</h2>
              <p className="card-description">
                Ajouter une nouveau voiture au système
              </p>
            </div>
            <div className="card-footer">
              <span className="card-action">Commencer →</span>
            </div>
          </button>

          {/* Scan Car Card */}
          <button className="action-card scan-card" onClick={handleScanCar}>
            <div className="card-icon-wrapper scan-icon">
              <div className="icon-glow"></div>
              <ScanLine className="card-icon" size={48} strokeWidth={2.5} />
            </div>
            <div className="card-content">
              <h2 className="card-title">Scanner une Voiture</h2>
              <p className="card-description">
                Scanner et identifier une Voiture existant
              </p>
            </div>
            <div className="card-footer">
              <span className="card-action">Scanner →</span>
            </div>
          </button>

          {/* List Car Card */}
          <button className="action-card list-card" onClick={handleListCar}>
            <div className="card-icon-wrapper list-icon">
              <div className="icon-glow"></div>
              <List className="card-icon" size={48} strokeWidth={2.5} />
            </div>
            <div className="card-content">
              <h2 className="card-title">Lister des Voitures</h2>
              <p className="card-description">
                Lister tous les Voitures existants actuellement
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

      <CreateCarModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

export default CarsPage