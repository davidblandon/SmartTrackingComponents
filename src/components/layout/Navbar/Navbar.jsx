import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/Logo.png';
import { Menu, X, Home, Box, Car, Users } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 'home', label: 'Accueil', icon: Home, path: '/' },
    { id: 'components', label: 'Composants', icon: Box, path: '/components' },
    { id: 'cars', label: 'Voitures', icon: Car, path: '/cars' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/clients' }
  ];

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="racing-stripe-top"></div>
      
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo-section">
          <div className="logo-icon-wrapper">
            <div className="logo-glow"></div>
            <div className="logo-icon">
              <img src={logo} alt="Smart Tracking Logo" className="logo-image" />
            </div>
          </div>
            <div className="logo-text">
              <h1 className="logo-title">
                SMART <span className="logo-highlight">TRACKING</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveLink(link.path);
              
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.path)}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {isActive && <div className="nav-link-glow"></div>}
                  <Icon size={16} className="nav-link-icon" />
                  <span className="nav-link-text">{link.label}</span>
                  {!isActive && <div className="nav-link-underline"></div>}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button onClick={() => setIsOpen(!isOpen)} className="menu-toggle">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-mobile ${isOpen ? 'nav-mobile-open' : ''}`}>
        <div className="nav-mobile-content">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isActiveLink(link.path);
            
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.path)}
                className={`nav-mobile-link ${isActive ? 'nav-mobile-link-active' : ''}`}
              >
                <Icon size={20} />
                <span>{link.label}</span>
                {isActive && <div className="nav-mobile-indicator"></div>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="racing-stripe-bottom"></div>
    </nav>
  );
};

export default Navbar;