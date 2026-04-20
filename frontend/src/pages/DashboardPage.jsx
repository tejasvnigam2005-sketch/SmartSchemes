import { Link } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import { useLanguage } from '../context/LanguageContext';
import SchemeCard from '../components/SchemeCard';
import Footer from '../components/Footer';

export default function DashboardPage() {
  const { savedSchemes, recentlyViewed, applicationProgress } = useDashboard();
  const { t } = useLanguage();

  const progressArray = Object.values(applicationProgress).sort((a, b) => 
    new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #F9FAFB 100%)',
        padding: '40px 0',
        borderBottom: '1px solid rgba(11,110,79,0.06)',
      }}>
        <div className="container animate-fade-up">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            {t('dashboard.title')}
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280' }}>
            {t('dashboard.subtitle')}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
          
          {/* Progress Section */}
          <section className="animate-fade-up delay-1">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" fill="none" stroke="#0B6E4F" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('dashboard.applicationProgress')}
            </h2>
            
            {progressArray.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {progressArray.map(prog => {
                  const percentage = Math.round((prog.stepsCompleted / prog.totalSteps) * 100) || 0;
                  return (
                    <div key={prog.schemeId} style={{
                      background: '#fff', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '20px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>{prog.schemeName}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8125rem' }}>
                        <span style={{ color: '#6B7280' }}>{prog.stepsCompleted} {t('dashboard.of')} {prog.totalSteps} {t('dashboard.stepsCompleted')}</span>
                        <span style={{ fontWeight: 600, color: '#0B6E4F' }}>{percentage}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'linear-gradient(90deg, #0B6E4F, #34D399)', width: `${percentage}%`, transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#F9FAFB', borderRadius: '16px', border: '1px dashed #E5E7EB' }}>
                <p style={{ color: '#6B7280', marginBottom: '8px' }}>{t('dashboard.noProgress')}</p>
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{t('dashboard.noProgressDesc')}</p>
              </div>
            )}
          </section>

          {/* Saved Schemes Section */}
          <section className="animate-fade-up delay-2">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" fill="none" stroke="#0B6E4F" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {t('dashboard.savedSchemes')} ({savedSchemes.length})
            </h2>

            {savedSchemes.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
                {savedSchemes.map((scheme, idx) => (
                  <SchemeCard key={`saved-${scheme._id}`} scheme={scheme} index={idx} schemeType={scheme.type || 'business'} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#F9FAFB', borderRadius: '16px', border: '1px dashed #E5E7EB' }}>
                <p style={{ color: '#6B7280', marginBottom: '8px' }}>{t('dashboard.noSaved')}</p>
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginBottom: '16px' }}>{t('dashboard.noSavedDesc')}</p>
                <Link to="/explore" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.8125rem' }}>
                  {t('dashboard.exploreSchemes')}
                </Link>
              </div>
            )}
          </section>

          {/* Recently Viewed Section */}
          <section className="animate-fade-up delay-3">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" fill="none" stroke="#0B6E4F" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('dashboard.recentlyViewed')}
            </h2>

            {recentlyViewed.length > 0 ? (
              <div className="schemes-carousel" style={{ paddingBottom: '16px' }}>
                {recentlyViewed.map((scheme, idx) => (
                  <SchemeCard key={`recent-${scheme._id}`} scheme={scheme} index={idx} schemeType={scheme.type || 'business'} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#F9FAFB', borderRadius: '16px', border: '1px dashed #E5E7EB' }}>
                <p style={{ color: '#6B7280', marginBottom: '8px' }}>{t('dashboard.noRecent')}</p>
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{t('dashboard.noRecentDesc')}</p>
              </div>
            )}
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
