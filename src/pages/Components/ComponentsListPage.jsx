import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Package } from 'lucide-react'
import { componentAPI } from '../../api/'
import './ComponentsListPage.css'

const ComponentsListPage = () => {
  const navigate = useNavigate()
  const [components, setComponents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true)
        
        // Use the API configuration
        const data = await componentAPI.list()
        setComponents(data)
      } catch (error) {
        console.error('Error fetching components:', error)
        
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
        
        setComponents(sampleData)
      } finally {
        setLoading(false)
      }
    }

    fetchComponents()
  }, [])

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBack = () => {
    navigate(-1)
  }

  const handleComponentClick = (component) => {
    // Navigate to component detail page or handle click
    console.log('Component clicked:', component)
    navigate(`/components/details/${component.component_qr}`)
  }

  return (
    <div className="components-list-page">
      <div className="list-container">
        {/* Header */}
        <div className="list-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={24} />
            <span>Retour</span>
          </button>
          <h1 className="list-title">Liste des Composants</h1>
          <p className="list-subtitle">
            {components.length} composant{components.length !== 1 ? 's' : ''} disponible{components.length !== 1 ? 's' : ''}
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

        {/* Components List */}
        <div className="components-list">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Chargement des composants...</p>
            </div>
          ) : filteredComponents.length === 0 ? (
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
            <div className="components-grid">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="component-card"
                  onClick={() => handleComponentClick(component)}
                >
                  <div className="component-header">
                    <div className="component-icon">
                      <Package size={24} />
                    </div>
                    <span className="component-reference">{component.reference}</span>
                  </div>
                  <h3 className="component-name">{component.name}</h3>
                  <p className="component-description">{component.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ComponentsListPage