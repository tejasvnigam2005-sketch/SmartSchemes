import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <p className="text-4xl mb-3">🔒</p>
          <h2 className="text-xl font-bold text-slate-800 mb-1.5">Login Required</h2>
          <p className="text-[0.875rem] text-slate-400 mb-6">Please login to view your profile</p>
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  const pref = user.preferences || {};
  const hasPrefs = pref.category || pref.state || pref.age || pref.income;
  const history = user.searchHistory || [];

  return (
    <div className="min-h-screen bg-white pt-[60px]">
      <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14">
        {/* Profile Header */}
        <div className="card overflow-hidden mb-6 animate-fade-up">
          <div className="h-24 bg-gradient-to-r from-primary-600 to-accent-500" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-8 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-2xl font-bold border-[3px] border-white shadow-sm">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div className="pb-0.5">
                <h1 className="text-xl font-bold text-slate-800">{user.name}</h1>
                <p className="text-[0.8125rem] text-slate-400">{user.email}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50/70 rounded-xl px-4 py-3">
                <p className="text-[0.625rem] font-semibold text-blue-500 uppercase tracking-wider mb-0.5">Account</p>
                <p className="text-sm font-bold text-blue-700">Free Plan</p>
              </div>
              <div className="bg-purple-50/70 rounded-xl px-4 py-3">
                <p className="text-[0.625rem] font-semibold text-purple-500 uppercase tracking-wider mb-0.5">Joined</p>
                <p className="text-sm font-bold text-purple-700">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card p-6 mb-6 animate-fade-up delay-1">
          <h2 className="text-[0.9375rem] font-bold text-slate-800 mb-4">Saved Preferences</h2>
          {hasPrefs ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {pref.category && (
                <div className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-[0.625rem] font-semibold text-slate-400 uppercase tracking-wider">Category</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5 capitalize">{pref.category}</p>
                </div>
              )}
              {pref.state && (
                <div className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-[0.625rem] font-semibold text-slate-400 uppercase tracking-wider">State</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5 capitalize">{pref.state}</p>
                </div>
              )}
              {pref.age && (
                <div className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-[0.625rem] font-semibold text-slate-400 uppercase tracking-wider">Age</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">{pref.age}</p>
                </div>
              )}
              {pref.income && (
                <div className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-[0.625rem] font-semibold text-slate-400 uppercase tracking-wider">Income</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">₹{pref.income?.toLocaleString()}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-300">
              <p className="text-2xl mb-1">📋</p>
              <p className="text-[0.8125rem]">No preferences saved yet</p>
            </div>
          )}
        </div>

        {/* Search History */}
        <div className="card p-6 mb-8 animate-fade-up delay-2">
          <h2 className="text-[0.9375rem] font-bold text-slate-800 mb-4">Past Searches</h2>
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.slice(-10).reverse().map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base">{s.category === 'business' ? '💼' : '🎓'}</span>
                    <div>
                      <p className="text-[0.8125rem] font-semibold text-slate-700 capitalize">{s.category} Search</p>
                      <p className="text-[0.6875rem] text-slate-400">
                        {new Date(s.searchedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <span className="tag bg-primary-50 text-primary-600">{s.results?.length || 0} results</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-300">
              <p className="text-2xl mb-1">🔍</p>
              <p className="text-[0.8125rem]">No searches yet</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-3">
          <Link to="/business" className="btn-primary">Explore Business Schemes</Link>
          <Link to="/education" className="btn-secondary">Explore Education Schemes</Link>
        </div>
      </div>
    </div>
  );
}
