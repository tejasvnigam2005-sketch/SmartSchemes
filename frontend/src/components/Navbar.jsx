import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, LANGUAGE_OPTIONS } from '../context/LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { path: '/', label: t('nav.home') },
    { path: '/explore', label: t('nav.explore') },
    { path: '/dashboard', label: t('nav.dashboard') },
    { path: '/how-it-works', label: t('nav.howItWorks') },
    { path: '/updates', label: t('nav.updates') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0B6E4F, #10B981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '0.875rem', fontWeight: 700,
              boxShadow: '0 2px 8px rgba(11,110,79,0.2)',
            }}>
              <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24"><path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" /></svg>
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>
              Smart<span style={{ color: '#0B6E4F' }}>Schemes</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: isActive(link.path) ? 600 : 500,
                  color: isActive(link.path) ? '#0B6E4F' : '#4B5563',
                  background: isActive(link.path) ? 'rgba(11,110,79,0.06)' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: isActive(link.path) ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  textDecorationColor: '#0B6E4F',
                  textDecorationThickness: '2px',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search */}
            <div className="hidden sm:flex" style={{
              alignItems: 'center', gap: '8px',
              padding: '8px 16px',
              background: '#F3F4F6',
              borderRadius: '10px',
              minWidth: '180px',
            }}>
              <svg width="14" height="14" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
              <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{t('nav.search')}</span>
            </div>

            {/* Language Dropdown */}
            <select
              value={lang}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '6px 24px 6px 12px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#0B6E4F',
                background: 'rgba(11,110,79,0.1)',
                border: '1px solid rgba(11,110,79,0.2)',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%230B6E4F' viewBox='0 0 24 24' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                transition: 'all 0.2s ease',
              }}
            >
              {LANGUAGE_OPTIONS.map(option => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
              style={{
                padding: '8px',
                borderRadius: '10px',
                color: '#4B5563',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            animation: 'fade-in 0.2s ease both',
          }}
        >
          <div className="container" style={{ padding: '12px 24px' }}>
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '0.9375rem',
                  fontWeight: isActive(link.path) ? 600 : 500,
                  color: isActive(link.path) ? '#0B6E4F' : '#4B5563',
                  background: isActive(link.path) ? 'rgba(11,110,79,0.06)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
