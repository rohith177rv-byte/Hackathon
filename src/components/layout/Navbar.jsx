import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCompare } from '../../contexts/CompareContext';
import { Menu, X, ChevronDown, Search, Building2, User, LogOut, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { compareList } = useCompare();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'engineer': return '/engineer/dashboard';
      case 'customer': return '/customer/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
          <Building2 size={28} strokeWidth={2.5} />
          <span>Build<strong>Connect</strong></span>
        </Link>

        <nav className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/engineers" className="nav-link" onClick={() => setMobileOpen(false)}>Find Engineers</Link>
          <Link to="/services" className="nav-link" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link to="/how-it-works" className="nav-link" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileOpen(false)}>About Us</Link>

          <div className="nav-actions">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="btn btn-secondary btn-sm" onClick={() => setMobileOpen(false)}>
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMobileOpen(false)}>
                  <User size={16} />
                  Sign In
                </Link>
                <Link to="/register/engineer" className="btn btn-outline btn-sm" onClick={() => setMobileOpen(false)}>
                  Register as Engineer
                </Link>
              </>
            )}
            <Link to="/engineers" className="btn btn-primary btn-sm nav-cta" onClick={() => setMobileOpen(false)}>
              <Search size={16} />
              Find an Engineer
            </Link>
          </div>

          {compareList.length > 0 && (
            <Link to="/compare" className="compare-badge" onClick={() => setMobileOpen(false)}>
              Compare ({compareList.length})
            </Link>
          )}
        </nav>

        <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
