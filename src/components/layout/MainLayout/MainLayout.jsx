import Navbar from '../Navbar/Navbar'
import './MainLayout.css'

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        {children}
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