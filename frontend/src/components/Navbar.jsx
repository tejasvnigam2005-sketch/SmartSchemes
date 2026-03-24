import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/business', label: 'Business' },
    { path: '/education', label: 'Education' },
    { path: '/updates', label: 'Updates' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="section">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="text-lg font-bold text-slate-800 hidden sm:block tracking-tight">
              SmartSchemes
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-[0.8125rem] font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[0.8125rem] font-medium transition-colors ${
                    isActive('/profile') ? 'bg-primary-50 text-primary-700' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span>{user.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={() => { logoutUser(); navigate('/'); }}
                  className="px-3 py-1.5 rounded-lg text-[0.8125rem] font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg text-[0.8125rem] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary !py-2 !px-5 !text-[0.8125rem] !rounded-lg !shadow-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-fade-in">
          <div className="section py-3 space-y-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                    Profile
                  </Link>
                  <button onClick={() => { logoutUser(); navigate('/'); setOpen(false); }} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Login</Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-center bg-primary-500 text-white">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
