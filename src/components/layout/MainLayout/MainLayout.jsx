import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './MainLayout.css'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="main-footer">
        <div className="footer-content">
          <p>&copy; 2025 Aurora Racing Technologie. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout