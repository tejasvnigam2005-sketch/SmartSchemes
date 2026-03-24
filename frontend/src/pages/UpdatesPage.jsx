import { Link } from 'react-router-dom';

const updates = [
  { id: 1, date: 'Mar 2026', title: 'PM Vidyalaxmi Scheme Extended', desc: 'Extended to cover NAAC B+ graded colleges for education loans with interest subvention.', cat: 'education', badge: 'New', badgeStyle: 'bg-emerald-50 text-emerald-700' },
  { id: 2, date: 'Mar 2026', title: 'MUDRA Loan Limit Increased', desc: 'Tarun category increased from ₹10 lakh to ₹20 lakh for technology startups and manufacturing.', cat: 'business', badge: 'Updated', badgeStyle: 'bg-blue-50 text-blue-700' },
  { id: 3, date: 'Feb 2026', title: 'New AI & ML Scholarship by AICTE', desc: 'New scholarship for AI, ML, and Data Science students covering full tuition up to ₹2 lakh/year.', cat: 'education', badge: 'New', badgeStyle: 'bg-emerald-50 text-emerald-700' },
  { id: 4, date: 'Feb 2026', title: 'Stand-Up India Extended to 2028', desc: 'Continuing support for SC/ST and women entrepreneurs with loans from ₹10 lakh to ₹1 crore.', cat: 'business', badge: 'Extended', badgeStyle: 'bg-purple-50 text-purple-700' },
  { id: 5, date: 'Jan 2026', title: 'National Scholarship Portal 2.0', desc: 'Revamped NSP with Aadhaar-based authentication and real-time status tracking.', cat: 'education', badge: 'Launch', badgeStyle: 'bg-orange-50 text-orange-700' },
  { id: 6, date: 'Jan 2026', title: 'CGTMSE Coverage Expanded', desc: 'Expanded to include micro enterprises in retail sector with increased ₹5 crore ceiling.', cat: 'business', badge: 'Updated', badgeStyle: 'bg-blue-50 text-blue-700' },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-white pt-[60px]">
      <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mx-auto mb-4">📢</div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1.5">Latest Updates</h1>
          <p className="text-[0.875rem] text-slate-400">Recent changes to government schemes</p>
        </div>

        {/* Updates */}
        <div className="space-y-4">
          {updates.map((u, i) => (
            <div key={u.id} className="card p-5 animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                  u.cat === 'business' ? 'bg-blue-50' : 'bg-purple-50'
                }`}>
                  {u.cat === 'business' ? '💼' : '🎓'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <span className={`tag ${u.badgeStyle}`}>{u.badge}</span>
                    <span className="text-[0.6875rem] text-slate-400">{u.date}</span>
                  </div>
                  <h3 className="text-[0.9375rem] font-bold text-slate-800 mb-1">{u.title}</h3>
                  <p className="text-[0.8125rem] text-slate-400 leading-relaxed">{u.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-up delay-5">
          <p className="text-[0.875rem] text-slate-400 mb-4">Want to find schemes matching your profile?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/business" className="btn-primary">Business Schemes</Link>
            <Link to="/education" className="btn-secondary">Education Schemes</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
