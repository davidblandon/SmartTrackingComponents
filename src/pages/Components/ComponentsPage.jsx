import { useState, useEffect, useRef } from 'react'
import { Plus, ScanLine, X } from 'lucide-react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import './ComponentsPage.css'

const ComponentsPage = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState(null)
  const scannerRef = useRef(null)
  const qrScannerRef = useRef(null)

  const handleCreateComponent = () => {
    console.log('Create component clicked')
    // Navigation logic will go here
  }

  const handleScanComponent = () => {
    console.log('Scan component clicked')
    setIsScanning(true)
    setScannedData(null)
  }

  const handleCloseScan = () => {
    setIsScanning(false)
    // Clean up scanner
    if (qrScannerRef.current) {
      qrScannerRef.current.clear().catch(error => {
        console.error("Failed to clear scanner:", error)
      })
      qrScannerRef.current = null
    }
  }

  const handleCloseResult = () => {
    setScannedData(null)
  }

  useEffect(() => {
    if (isScanning && scannerRef.current && !qrScannerRef.current) {
      const onScanSuccess = (decodedText, decodedResult) => {
        console.log('QR Code scanned:', decodedText)
        setScannedData(decodedText)
        setIsScanning(false)
        
        // Clean up scanner after successful scan
        if (qrScannerRef.current) {
          qrScannerRef.current.clear().catch(error => {
            console.error("Failed to clear scanner:", error)
          })
          qrScannerRef.current = null
        }
        
        // Here you can add additional logic with the scanned data
        // For example, navigate to another page or process the QR code
      }

      const onScanError = (errorMessage) => {
        // Handle scan errors silently (most are just "no QR code found")
        // Only log actual errors
        if (!errorMessage.includes('No MultiFormat Readers')) {
          console.warn('QR Scan error:', errorMessage)
        }
      }

      try {
        qrScannerRef.current = new Html5QrcodeScanner(
          "qr-reader",
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          false
        )
        qrScannerRef.current.render(onScanSuccess, onScanError)
      } catch (error) {
        console.error("Failed to initialize scanner:", error)
      }
    }

    // Cleanup on unmount or when scanning stops
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner on cleanup:", error)
        })
        qrScannerRef.current = null
      }
    }
  }, [isScanning])

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

      {/* QR Scanner Modal */}
      {isScanning && (
        <div className="scanner-modal">
          <div className="scanner-overlay" onClick={handleCloseScan}></div>
          <div className="scanner-container">
            <div className="scanner-header">
              <h2 className="scanner-title">Scanner le QR Code</h2>
              <button className="close-button" onClick={handleCloseScan}>
                <X size={24} />
              </button>
            </div>
            
            <div className="scanner-content">
              <div id="qr-reader" ref={scannerRef}></div>
              <p className="scanner-instructions">
                Positionnez le QR code dans le cadre
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scanned Result Modal */}
      {scannedData && (
        <div className="scanner-modal">
          <div className="scanner-overlay" onClick={handleCloseResult}></div>
          <div className="result-container">
            <div className="scanner-header">
              <h2 className="scanner-title">QR Code Scanné</h2>
              <button className="close-button" onClick={handleCloseResult}>
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
              <div className="result-data">{scannedData}</div>
              <button className="result-button" onClick={handleCloseResult}>
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComponentsPage