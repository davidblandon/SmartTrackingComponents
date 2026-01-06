import { Navigate, Outlet } from 'react-router-dom'
import { authAPI } from '../../api'

/**
 * RoleProtectedRoute - Protects routes based on user roles
 * @param {Array<string>} allowedRoles - Array of roles that can access this route
 * @param {string} redirectTo - Path to redirect if user doesn't have required role (default: '/')
 */
const RoleProtectedRoute = ({ allowedRoles = [], redirectTo = '/' }) => {
  // Check if user is authenticated first
  if (!authAPI.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // Get user data from localStorage
  const user = authAPI.getUser()
  console.log(user)

  // If no user data found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check if user has one of the allowed roles
  const hasRequiredRole = allowedRoles.length === 0 || allowedRoles.includes(user.role)

  // If user doesn't have required role, redirect
  if (!hasRequiredRole) {
    return <Navigate to={redirectTo} replace />
  }

  // User is authenticated and has required role, render child routes
  return <Outlet />
}

export default RoleProtectedRoute