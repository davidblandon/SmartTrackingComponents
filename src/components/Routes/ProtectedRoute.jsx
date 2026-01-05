import { Navigate, Outlet } from 'react-router-dom'
import { authAPI } from '../../api'

const ProtectedRoute = () => {
  // If not authenticated, redirect to login
  return authAPI.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute