import { useLocation, Link, useNavigate } from 'react-router-dom';
import SchemeCard from '../components/SchemeCard';
import ComparisonTable from '../components/ComparisonTable';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, category } = location.state || {};

  if (!data) {
    return (
      <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center animate-fade-up">
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>No Results</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Fill the form first to get recommendations</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const schemes = data.results || [];
  const isBiz = category === 'business';

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--color-surface)' }}>
      <div className="container" style={{ padding: '40px 24px 64px' }}>
        {/* Header */}
        <div className="text-center animate-fade-up" style={{ marginBottom: '40px' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px' }}>Results</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            {isBiz ? 'Business' : 'Education'} Recommendations
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            AI-ranked by relevance · {data.totalMatches} matched · Top {schemes.length} shown
          </p>
        </div>

        {/* Comparison */}
        {schemes.length > 0 && (
          <div className="animate-fade-up delay-1" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '16px' }}>Quick Comparison</h2>
            <ComparisonTable schemes={schemes} schemeType={category} />
          </div>
        )}

        {/* Cards */}
        {schemes.length > 0 ? (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '16px' }}>Detailed Results</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))', gap: '16px' }}>
              {schemes.map((scheme, idx) => (
                <SchemeCard key={scheme._id || idx} scheme={scheme} index={idx} schemeType={category} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-up" style={{ padding: '64px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>😔</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>No matching schemes</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Try adjusting your criteria</p>
          </div>
        )}

        {/* Actions */}
        <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
          <button onClick={() => navigate(-1)} className="btn-outline">← Modify Search</button>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
