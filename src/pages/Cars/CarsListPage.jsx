import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Package } from 'lucide-react'
import { carAPI } from '../../api/'
import './CarsListPage.css'

const CarsListPage = () => {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchCars = async () => {
    try {
      setLoading(true)

      // Use the API configuration
      const data = await carAPI.list()
      setCars(data)
    } catch (error) {
      console.error('Error fetching Cars:', error)

      // Fallback to sample data if API fails
      const sampleData = [
        {
          name: 'Ferrari F40',
          hours: 1250,
          owner: 'Jean Dupont',
          car_qr: 'CAR-2024-001'
        },
        {
          name: 'Porsche 911 GT3',
          hours: 850,
          owner: 'Marie Martin',
          car_qr: 'CAR-2024-002'
        },
        {
          name: 'Lamborghini Huracán',
          hours: 620,
          owner: 'Pierre Dubois',
          car_qr: 'CAR-2024-003'
        },
        {
          name: 'McLaren 720S',
          hours: 450,
          owner: 'Sophie Bernard',
          car_qr: 'CAR-2024-004'
        }
      ]

      setCars(sampleData)
    } finally {
      setLoading(false)
    }
  }

  fetchCars()
}, [])

  const filteredCars = cars.filter(car =>
    (car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (car.reference && car.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (car.description && car.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (car.qr_code && car.qr_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (car.nature && car.nature.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleBack = () => {
    navigate(-1)
  }

  const handleCarClick = (car) => {
    // Navigate to car detail page or handle click
    console.log('Car clicked:', car)
    navigate(`/cars/details/${car.car_qr}`)
  }

  return (
    <div className="cars-list-page">
      <div className="list-container">
        {/* Header */}
        <div className="list-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={24} />
            <span>Retour</span>
          </button>
          <h1 className="list-title">Liste des Voitures</h1>
          <p className="list-subtitle">
            {cars.length} voiture{cars.length !== 1 ? 's' : ''} disponible{cars.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par nom, référence ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Cars List */}
        <div className="cars-list">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des voitures...</p>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="empty-state">
              <Package size={64} className="empty-icon" />
              <h3>Aucune voiture trouvée</h3>
              <p>
                {searchTerm
                  ? 'Essayez avec des termes de recherche différents'
                  : 'Aucune voiture disponible pour le moment'}
              </p>
            </div>
          ) : (
            <div className="cars-grid">
              {filteredCars.map((car, index) => (
                <div
                  key={car.id || car.qr_code || car.reference || index}
                  className="car-card"
                  onClick={() => handleCarClick(car)}
                >
                  <div className="car-header">
                    <div className="car-icon">
                      <Package size={24} />
                    </div>
                    <span className="car-reference">{car.owner || 'N/A'}</span>
                  </div>
                  <h3 className="car-name">{car.name || 'Sans nom'}</h3>
                
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarsListPage