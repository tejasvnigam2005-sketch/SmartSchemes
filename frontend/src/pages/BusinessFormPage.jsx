import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../utils/api';

const STATES = [
  'all', 'andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh',
  'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka',
  'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram',
  'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu',
  'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal',
  'jammu & kashmir', 'ladakh', 'delhi', 'chandigarh'
];

const cap = (s) => s === 'all' ? 'All India' : s.replace(/\b\w/g, c => c.toUpperCase());

export default function BusinessFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ age: '', income: '', businessType: '', investment: '', state: '' });

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getRecommendations({
        category: 'business',
        filters: { age: Number(form.age), income: Number(form.income), businessType: form.businessType, investment: Number(form.investment), state: form.state }
      });
      navigate('/results', { state: { data: res.data, category: 'business' } });
    } catch { alert('Error getting recommendations. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white pt-[60px]">
      <div className="max-w-md mx-auto px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-4">💼</div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1.5">Business Schemes</h1>
          <p className="text-[0.875rem] text-slate-400">Enter your details for personalized recommendations</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="card p-6 sm:p-8 animate-fade-up delay-1">
          <div className="space-y-5">
            <div>
              <label className="form-label">Age <span className="required">*</span></label>
              <input type="number" name="age" value={form.age} onChange={set} required min="18" max="100" placeholder="e.g. 30" className="form-input" />
            </div>

            <div>
              <label className="form-label">Annual Income (₹) <span className="required">*</span></label>
              <input type="number" name="income" value={form.income} onChange={set} required min="0" placeholder="e.g. 500000" className="form-input" />
            </div>

            <div>
              <label className="form-label">Business Type <span className="required">*</span></label>
              <select name="businessType" value={form.businessType} onChange={set} required className="form-input">
                <option value="">Select type</option>
                {['startup', 'msme', 'agriculture', 'manufacturing', 'services', 'export', 'retail', 'technology'].map(t => (
                  <option key={t} value={t}>{cap(t)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Investment Requirement (₹) <span className="required">*</span></label>
              <input type="number" name="investment" value={form.investment} onChange={set} required min="0" placeholder="e.g. 1000000" className="form-input" />
            </div>

            <div>
              <label className="form-label">State <span className="required">*</span></label>
              <select name="state" value={form.state} onChange={set} required className="form-input">
                <option value="">Select state</option>
                {STATES.map(s => <option key={s} value={s}>{cap(s)}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-8 !py-3.5 !text-[0.9375rem]">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Finding Schemes…
              </span>
            ) : 'Get AI Recommendations'}
          </button>
        </form>
      </div>
    </div>
  );
}
