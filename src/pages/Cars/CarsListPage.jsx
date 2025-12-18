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
            id: 1,
            name: 'Moteur V6',
            reference: 'ENG-2024-001',
            description: 'Moteur à essence V6 3.0L'
          },
          {
            id: 2,
            name: 'Boîte de vitesses',
            reference: 'TRANS-2024-001',
            description: 'Boîte de vitesses automatique 8 vitesses'
          },
          {
            id: 3,
            name: 'Système de freinage',
            reference: 'BRAKE-2024-001',
            description: 'Système de freinage ABS avec assistance électronique'
          },
          {
            id: 4,
            name: 'Suspension avant',
            reference: 'SUSP-2024-001',
            description: 'Suspension pneumatique avant adaptative'
          }
        ]
        
        setCars(sampleData)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  const filteredCars = cars.filter(Car =>
    Car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Car.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Car.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBack = () => {
    navigate(-1)
  }

  const handleCarClick = (car) => {
    // Navigate to car detail page or handle click
    console.log('Car clicked:', car)
    // navigate(`/cars/${car.id}`)
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
          <h1 className="list-title">Liste des Composants</h1>
          <p className="list-subtitle">
            {cars.length} composant{cars.length !== 1 ? 's' : ''} disponible{cars.length !== 1 ? 's' : ''}
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

        {/* cars List */}
        <div className="cars-list">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des composants...</p>
            </div>
          ) : filteredcars.length === 0 ? (
            <div className="empty-state">
              <Package size={64} className="empty-icon" />
              <h3>Aucun composant trouvé</h3>
              <p>
                {searchTerm
                  ? 'Essayez avec des termes de recherche différents'
                  : 'Aucun composant disponible pour le moment'}
              </p>
            </div>
          ) : (
            <div className="cars-grid">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="car-card"
                  onClick={() => handleCarClick(car)}
                >
                  <div className="car-header">
                    <div className="car-icon">
                      <Package size={24} />
                    </div>
                    <span className="car-reference">{car.reference}</span>
                  </div>
                  <h3 className="car-name">{car.name}</h3>
                  <p className="car-description">{car.description}</p>
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