import { Link } from 'react-router-dom';

const features = [
  { icon: '🤖', title: 'AI Matching', desc: 'Smart relevance scoring ranks schemes by your profile' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get personalized recommendations in seconds' },
  { icon: '🔍', title: 'Compare Easily', desc: 'Side-by-side comparison of top matching schemes' },
  { icon: '🔊', title: 'Voice Support', desc: 'Listen to scheme details in Hindi or English' },
];

export default function LandingPage() {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── Hero Section ─────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1E3A8A 100%)',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated decorative elements */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(59,130,246,0.08)', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '3%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', animation: 'float 10s ease-in-out infinite 2s' }} />
        <div style={{ position: 'absolute', top: '40%', left: '15%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(59,130,246,0.05)', animation: 'float 6s ease-in-out infinite 1s' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="animate-fade-up">
            <div className="section-tag" style={{ margin: '0 auto 24px', borderColor: 'rgba(59,130,246,0.4)' }}>
              AI-Powered Platform
            </div>
            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, letterSpacing: '-1px', maxWidth: '600px', margin: '0 auto 20px' }}>
              Find Government Schemes
              <br />
              <span style={{ color: '#3B82F6' }}>Made For You</span>
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto 48px', lineHeight: 1.7 }}>
              AI-powered filtering and ranking to match you with the most relevant government schemes — instantly.
            </p>
          </div>

          {/* ── Category Cards (stacked vertically) ── */}
          <div style={{ maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Business Card */}
            <Link to="/business" className="animate-fade-up delay-1" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>💼</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Business Schemes</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>MUDRA, Startup India, MSME support & more</p>
                </div>
                <svg width="20" height="20" fill="none" stroke="rgba(59,130,246,0.7)" viewBox="0 0 24 24" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Education Card */}
            <Link to="/education" className="animate-fade-up delay-2" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎓</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Education Schemes</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>Scholarships, fellowships & education loans</p>
                </div>
                <svg width="20" height="20" fill="none" stroke="rgba(59,130,246,0.7)" viewBox="0 0 24 24" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-3" style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '56px', flexWrap: 'wrap' }}>
            {[{ v: '20+', l: 'Schemes' }, { v: 'AI', l: 'Powered' }, { v: '2', l: 'Categories' }, { v: '100%', l: 'Free' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginTop: '6px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="text-center animate-fade-up" style={{ marginBottom: '48px' }}>
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>Features</div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.5px' }}>How SmartSchemes Works</h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginTop: '10px', maxWidth: '420px', margin: '10px auto 0' }}>
              Three steps to discover government schemes tailored for you
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '880px', margin: '0 auto' }}>
            {features.map((f, i) => (
              <div key={i} className="card animate-fade-up" style={{ padding: '28px 24px', animationDelay: `${i * 0.1}s`, textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', margin: '0 auto 16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────── */}
      <section style={{ padding: '64px 0', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container text-center animate-fade-up">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '10px' }}>Start Exploring Now</h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Discover benefits designed for your needs</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/business" className="btn-primary">Business Schemes</Link>
            <Link to="/education" className="btn-outline">Education Schemes</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────── */}
      <footer style={{ background: '#fff', borderTop: '1px solid var(--color-border-light)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Smart<span style={{ color: '#3B82F6' }}>Schemes</span></span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>© 2026 All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
