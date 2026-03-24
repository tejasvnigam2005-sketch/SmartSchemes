import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await signup({ name: form.name, email: form.email, password: form.password });
      loginUser(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">S</div>
          <h1 className="text-xl font-bold text-slate-800">Create Account</h1>
          <p className="text-[0.8125rem] text-slate-400 mt-1">Join SmartSchemes to save preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 animate-fade-up delay-1">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-[0.8125rem] text-red-600">{error}</div>
          )}

          <div className="space-y-5">
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="John Doe" className="form-input" />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com" className="form-input" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} placeholder="Min. 6 characters" className="form-input" />
            </div>
            <div>
              <label className="form-label">Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required placeholder="••••••••" className="form-input" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 !py-3">
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>

          <p className="text-center text-[0.8125rem] text-slate-400 mt-5">
            Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
