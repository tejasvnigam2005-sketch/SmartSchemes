import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-[60px]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        {/* Soft glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

        <div className="relative section py-24 sm:py-32 lg:py-40 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[0.75rem] font-medium text-blue-200/80">AI-Powered Scheme Discovery</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 animate-fade-up delay-1 tracking-tight">
            Find the Right
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Government Schemes
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-blue-200/60 max-w-lg mx-auto mb-12 animate-fade-up delay-2 leading-relaxed">
            Intelligent filtering and AI-powered ranking to match you with the most relevant schemes — in seconds.
          </p>

          {/* Category Cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto animate-fade-up delay-3">
            <Link
              to="/business"
              className="group flex flex-col items-center gap-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-7 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                💼
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Business Schemes</h2>
                <p className="text-[0.8125rem] text-blue-200/50 leading-snug">MUDRA loans, Startup India, MSME support & more</p>
              </div>
              <span className="text-[0.75rem] font-semibold text-blue-300/70 group-hover:text-blue-300 transition-colors">
                Explore →
              </span>
            </Link>

            <Link
              to="/education"
              className="group flex flex-col items-center gap-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-7 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎓
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Education Schemes</h2>
                <p className="text-[0.8125rem] text-purple-200/50 leading-snug">Scholarships, fellowships & education loans</p>
              </div>
              <span className="text-[0.75rem] font-semibold text-purple-300/70 group-hover:text-purple-300 transition-colors">
                Explore →
              </span>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-12 mt-16 animate-fade-up delay-4">
            {[
              { value: '20+', label: 'Schemes' },
              { value: 'AI', label: 'Powered' },
              { value: '2', label: 'Categories' },
              { value: 'Free', label: 'Forever' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[0.625rem] text-blue-300/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="section">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-slate-400 text-[0.9375rem] max-w-md mx-auto">
              Three simple steps to discover schemes tailored for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Choose Category', desc: 'Select between Business or Education schemes', color: 'bg-blue-50 text-blue-600' },
              { step: '2', title: 'Enter Details', desc: 'Fill in your age, income, location and other criteria', color: 'bg-purple-50 text-purple-600' },
              { step: '3', title: 'Get Results', desc: 'Our AI ranks and compares the best schemes for you', color: 'bg-emerald-50 text-emerald-600' },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-sm font-bold mx-auto mb-4`}>
                  {item.step}
                </div>
                <h3 className="text-[0.9375rem] font-bold text-slate-800 mb-1.5">{item.title}</h3>
                <p className="text-[0.8125rem] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-slate-50">
        <div className="section text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 tracking-tight">
            Ready to find your perfect scheme?
          </h2>
          <p className="text-slate-400 text-[0.875rem] mb-8 max-w-sm mx-auto">
            Start exploring government benefits designed for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/business" className="btn-primary">
              Business Schemes
            </Link>
            <Link to="/education" className="btn-secondary">
              Education Schemes
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 border-t border-slate-100 bg-white">
        <div className="section flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-[10px] font-bold">S</div>
            <span className="text-sm font-semibold text-slate-700">SmartSchemes</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 SmartSchemes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
