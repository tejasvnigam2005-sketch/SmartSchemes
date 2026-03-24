import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">S</div>
          <h1 className="text-xl font-bold text-slate-800">Welcome back</h1>
          <p className="text-[0.8125rem] text-slate-400 mt-1">Login to access your saved schemes</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 animate-fade-up delay-1">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-[0.8125rem] text-red-600">{error}</div>
          )}

          <div className="space-y-5">
            <div>
              <label className="form-label">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com" className="form-input" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required placeholder="••••••••" className="form-input" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 !py-3">
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <p className="text-center text-[0.8125rem] text-slate-400 mt-5">
            Don't have an account? <Link to="/signup" className="text-primary-600 font-semibold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
