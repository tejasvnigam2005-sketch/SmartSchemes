import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../utils/api';

const STATES = ['all','andhra pradesh','arunachal pradesh','assam','bihar','chhattisgarh','goa','gujarat','haryana','himachal pradesh','jharkhand','karnataka','kerala','madhya pradesh','maharashtra','manipur','meghalaya','mizoram','nagaland','odisha','punjab','rajasthan','sikkim','tamil nadu','telangana','tripura','uttar pradesh','uttarakhand','west bengal','jammu & kashmir','ladakh','delhi','chandigarh'];
const cap = s => s === 'all' ? 'All India' : s.replace(/\b\w/g, c => c.toUpperCase());

export default function BusinessFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState({ age: '', income: '', businessType: '', investment: '', state: '' });
  const set = e => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await getRecommendations({ category: 'business', filters: { age: +f.age, income: +f.income, businessType: f.businessType, investment: +f.investment, state: f.state } });
      navigate('/results', { state: { data: res.data, category: 'business' } });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to get recommendations. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--color-surface)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '460px', padding: '48px 24px 64px' }}>
        {/* Header */}
        <div className="text-center animate-fade-up" style={{ marginBottom: '32px' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px' }}>Business</div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.5px', marginBottom: '8px' }}>Business Schemes</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Tell us about your business for AI recommendations</p>
        </div>

        {/* Form Card */}
        <form onSubmit={submit} className="card animate-fade-up delay-1" style={{ padding: '32px 28px' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px', color: '#EF4444', fontSize: '0.8125rem', fontWeight: 500, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="form-label">Age<span className="required">*</span></label>
              <input type="number" name="age" value={f.age} onChange={set} required min="18" max="100" placeholder="e.g. 30" className="form-input" />
            </div>

            <div>
              <label className="form-label">Annual Income (₹)<span className="required">*</span></label>
              <input type="number" name="income" value={f.income} onChange={set} required min="0" placeholder="e.g. 500000" className="form-input" />
            </div>

            <div>
              <label className="form-label">Business Type<span className="required">*</span></label>
              <select name="businessType" value={f.businessType} onChange={set} required className="form-input">
                <option value="">Select type</option>
                {['startup','msme','agriculture','manufacturing','services','export','retail','technology'].map(t => (
                  <option key={t} value={t}>{cap(t)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Investment Required (₹)<span className="required">*</span></label>
              <input type="number" name="investment" value={f.investment} onChange={set} required min="0" placeholder="e.g. 1000000" className="form-input" />
            </div>

            <div>
              <label className="form-label">State<span className="required">*</span></label>
              <select name="state" value={f.state} onChange={set} required className="form-input">
                <option value="">Select state</option>
                {STATES.map(s => <option key={s} value={s}>{cap(s)}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '28px', height: '50px' }}>
            {loading ? <><div className="spinner" /> Finding Schemes…</> : 'Get AI Recommendations'}
          </button>
        </form>
      </div>
    </div>
  );
}
