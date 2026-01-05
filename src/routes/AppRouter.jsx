import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout/MainLayout'
import AuthLayout from '../components/layout/MainLayout/AuthLayout'
import ProtectedRoute from '../components/Routes/ProtectedRoute'

import ComponentsPage from '../pages/Components/ComponentsPage'
import ComponentsListPage from '../pages/Components/ComponentsListPage'
import ComponentDetailsPage from '../pages/Components/ComponentsDetailsPage'

import CarsPage from '../pages/Cars/CarsPage'
import CarsListPage from '../pages/Cars/CarsListPage'
import CarDetailsPage from '../pages/Cars/CarsDetailsPage'

import LoginPage from '../pages/Login/LoginPage'

const Home = () => <div style={{ padding: '2rem' }}><h1>Accueil</h1><p>Bienvenue à Smart Track</p></div>
const Dashboard = () => <div style={{ padding: '2rem' }}><h1>Tableau de bord</h1></div>
const Clients = () => <div style={{ padding: '2rem' }}><h1>Clients</h1></div>
const NotFound = () => <div style={{ padding: '2rem' }}><h1>404 - Page non trouvée</h1></div>

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes (PUBLIC - WITHOUT navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes (REQUIRE AUTH - WITH navbar and footer) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/list" element={<ComponentsListPage />} />
          <Route path="/components/details/:qrCode" element={<ComponentDetailsPage />} />

          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/list" element={<CarsListPage />} />
          <Route path="/cars/details/:qrCode" element={<CarDetailsPage />} />
          
          <Route path="/clients" element={<Clients />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter