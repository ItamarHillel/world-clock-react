import { NavLink } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="navbar-logo">🌍</span>
          <span className="navbar-title">שעון עולמי</span>
        </div>

        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            ראשי
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            אודות
          </NavLink>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'מעבר למצב בהיר' : 'מעבר למצב כהה'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
