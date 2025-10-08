import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import MainLayout from './components/layout/MainLayout/MainLayout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </BrowserRouter>
  )
}

export default App