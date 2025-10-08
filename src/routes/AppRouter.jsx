import { Routes, Route } from 'react-router-dom'
import ComponentsPage from '../pages/Components/ComponentsPage'

// Temporary simple components until we create the actual pages
const Home = () => <div style={{ padding: '2rem' }}><h1>Accueil</h1><p>Bienvenue à Smart Track</p></div>
const Dashboard = () => <div style={{ padding: '2rem' }}><h1>Tableau de bord</h1></div>
const Cars = () => <div style={{ padding: '2rem' }}><h1>Véhicules</h1></div>
const Clients = () => <div style={{ padding: '2rem' }}><h1>Clients</h1></div>
const NotFound = () => <div style={{ padding: '2rem' }}><h1>404 - Page non trouvée</h1></div>

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/components" element={<ComponentsPage />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter