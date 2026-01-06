import { useState, useEffect } from 'react'
import { Car, Package, TrendingUp } from 'lucide-react'
import { carAPI, componentAPI } from '../../api'
import './HomePage.css'

const CountUpAnimation = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

const HomePage = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalComponents: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Fetch both cars and components
        const [carsData, componentsData] = await Promise.all([
          carAPI.list(),
          componentAPI.list()
        ])

        setStats({
          totalCars: carsData?.length || 0,
          totalComponents: componentsData?.length || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats({
          totalCars: 0,
          totalComponents: 0
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="brand-header">
              <TrendingUp className="brand-icon" size={36} />
              <div>
                <h1 className="welcome-title">Bienvenue sur</h1>
                <h2 className="app-name">SmartTrackingComponents</h2>
                <p className="company-name">par <span className="highlight">AuroraRacing</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            {/* Cars Card */}
            <div className="stat-card car-card">
              <div className="stat-icon-wrapper car-icon">
                <Car size={32} />
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Véhicules</h3>
                <div className="stat-number">
                  {loading ? (
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <CountUpAnimation end={stats.totalCars} duration={2000} />
                  )}
                </div>
                <p className="stat-subtitle">Total enregistrés</p>
              </div>
            </div>

            {/* Components Card */}
            <div className="stat-card component-card">
              <div className="stat-icon-wrapper component-icon">
                <Package size={32} />
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Composants</h3>
                <div className="stat-number">
                  {loading ? (
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <CountUpAnimation end={stats.totalComponents} duration={2000} />
                  )}
                </div>
                <p className="stat-subtitle">Total enregistrés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage