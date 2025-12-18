import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import '../CarsPage.css'

const ScannerModal = ({ isOpen, onClose, onSuccess }) => {
  const scannerRef = useRef(null)
  const qrScannerRef = useRef(null)

  useEffect(() => {
    if (isOpen && scannerRef.current && !qrScannerRef.current) {
      const onScanSuccess = (decodedText, decodedResult) => {
        console.log('QR Code scanned:', decodedText)
        onSuccess(decodedText)
        
        // Clean up scanner after successful scan
        if (qrScannerRef.current) {
          qrScannerRef.current.clear().catch(error => {
            console.error("Failed to clear scanner:", error)
          })
          qrScannerRef.current = null
        }
      }

      const onScanError = (errorMessage) => {
        // Handle scan errors silently (most are just "no QR code found")
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

    // Cleanup on unmount or when modal closes
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner on cleanup:", error)
        })
        qrScannerRef.current = null
      }
    }
  }, [isOpen, onSuccess])

  if (!isOpen) return null

  return (
    <div className="scanner-modal">
      <div className="scanner-overlay" onClick={onClose}></div>
      <div className="scanner-container">
        <div className="scanner-header">
          <h2 className="scanner-title">Scanner le QR Code</h2>
          <button className="close-button" onClick={onClose}>
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
  )
}

export default ScannerModal