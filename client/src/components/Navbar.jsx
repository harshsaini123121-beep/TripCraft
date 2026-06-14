import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Map, LogOut, LogIn, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px',
      background: scrolled ? 'rgba(8,12,24,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={20} color="#0A0800" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Trip<span className="gold-text">Craft</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          <Link to="/plan" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, color: location.pathname === '/plan' ? 'var(--gold)' : 'var(--text-muted)', fontSize: 14, fontWeight: 500, transition: 'color 0.2s', background: location.pathname === '/plan' ? 'var(--gold-dim)' : 'transparent' }}>
            <Sparkles size={15} /> Plan Trip
          </Link>
          {user && (
            <Link to="/my-trips" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, color: location.pathname === '/my-trips' ? 'var(--gold)' : 'var(--text-muted)', fontSize: 14, fontWeight: 500, transition: 'color 0.2s', background: location.pathname === '/my-trips' ? 'var(--gold-dim)' : 'transparent' }}>
              <Map size={15} /> My Trips
            </Link>
          )}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#0A0800' }}>
                {user.name?.[0]?.toUpperCase()}
              </div>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}>
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
              <Link to="/login" className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
                <LogIn size={14} /> Login
              </Link>
              <Link to="/register" className="btn btn-gold" style={{ padding: '8px 16px', fontSize: 13 }}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', padding: 4 }} className="mobile-menu-btn">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ padding: '16px 0 20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }} className="mobile-menu">
          <Link to="/plan" onClick={() => setMenuOpen(false)} style={{ padding: '10px 16px', color: 'var(--text)', fontSize: 15 }}>Plan Trip</Link>
          {user && <Link to="/my-trips" onClick={() => setMenuOpen(false)} style={{ padding: '10px 16px', color: 'var(--text)', fontSize: 15 }}>My Trips</Link>}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ padding: '10px 16px', color: 'var(--error)', fontSize: 15, textAlign: 'left', background: 'none', border: 'none' }}>Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{ padding: '10px 16px', color: 'var(--text)', fontSize: 15 }}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} style={{ padding: '10px 16px', color: 'var(--gold)', fontSize: 15 }}>Register</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
