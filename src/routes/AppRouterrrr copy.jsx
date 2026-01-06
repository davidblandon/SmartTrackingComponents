import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout/MainLayout'
import AuthLayout from '../components/layout/MainLayout/AuthLayout'
import ProtectedRoute from '../components/Routes/ProtectedRoute'
import RoleProtectedRoute from '../components/Routes/RoleProtectedRoute'

import ComponentsPage from '../pages/Components/ComponentsPage'
import ComponentsListPage from '../pages/Components/ComponentsListPage'
import ComponentDetailsPage from '../pages/Components/ComponentsDetailsPage'

import CarsPage from '../pages/Cars/CarsPage'
import CarsListPage from '../pages/Cars/CarsListPage'
import CarDetailsPage from '../pages/Cars/CarsDetailsPage'

import LoginPage from '../pages/Login/LoginPage'
import HomePage from '../pages/home/HomePage'


const Dashboard = () => <div style={{ padding: '2rem' }}><h1>Tableau de bord</h1></div>
const Clients = () => <div style={{ padding: '2rem' }}><h1>Clients</h1></div>
const NotFound = () => <div style={{ padding: '2rem' }}><h1>404 - Page non trouvée</h1></div>
const Unauthorized = () => <div style={{ padding: '2rem' }}><h1>403 - Accès non autorisé</h1><p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p></div>

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
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Components Routes - Only for 'admin' and 'technician' roles */}
          <Route element={<RoleProtectedRoute allowedRoles={['admin', 'technician']} redirectTo="/unauthorized" />}>
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/components/list" element={<ComponentsListPage />} />
            <Route path="/components/details/:qrCode" element={<ComponentDetailsPage />} />
          </Route>

          {/* Cars Routes - Available to all authenticated users */}
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/list" element={<CarsListPage />} />
          <Route path="/cars/details/:qrCode" element={<CarDetailsPage />} />
          
          <Route path="/clients" element={<Clients />} />
          
          {/* Unauthorized access page */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter