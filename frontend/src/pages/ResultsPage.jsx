import { useLocation, Link, useNavigate } from 'react-router-dom';
import SchemeCard from '../components/SchemeCard';
import ComparisonTable from '../components/ComparisonTable';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, category } = location.state || {};

  if (!data) {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-xl font-bold text-slate-800 mb-1.5">No Results</h2>
          <p className="text-[0.875rem] text-slate-400 mb-6">Fill the form first to get recommendations</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const schemes = data.results || [];
  const isBiz = category === 'business';

  return (
    <div className="min-h-screen bg-white pt-[60px]">
      <div className="section py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-slate-50 rounded-full px-3.5 py-1 text-[0.75rem] text-slate-500 font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {data.totalMatches} schemes matched
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-1.5">
            {isBiz ? 'Business' : 'Education'} Recommendations
          </h1>
          <p className="text-[0.875rem] text-slate-400">
            AI-ranked by relevance · Top {schemes.length} results
          </p>
        </div>

        {/* Comparison Table */}
        {schemes.length > 0 && (
          <div className="mb-12 animate-fade-up delay-1">
            <h2 className="text-[0.9375rem] font-bold text-slate-700 mb-4">Quick Comparison</h2>
            <ComparisonTable schemes={schemes} schemeType={category} />
          </div>
        )}

        {/* Scheme Cards */}
        {schemes.length > 0 ? (
          <div className="mb-10">
            <h2 className="text-[0.9375rem] font-bold text-slate-700 mb-5">Detailed Results</h2>
            <div className="grid lg:grid-cols-2 gap-5">
              {schemes.map((scheme, idx) => (
                <SchemeCard key={scheme._id || idx} scheme={scheme} index={idx} schemeType={category} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-up">
            <p className="text-4xl mb-3">😔</p>
            <h3 className="text-lg font-bold text-slate-700 mb-1.5">No matching schemes</h3>
            <p className="text-[0.875rem] text-slate-400">Try adjusting your criteria</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 animate-fade-up delay-3">
          <button onClick={() => navigate(-1)} className="btn-secondary">← Modify Search</button>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
