import { useState } from 'react';
import TTS from '../utils/tts';

export default function SchemeCard({ scheme, index = 0, schemeType = 'business' }) {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lang, setLang] = useState('en');

  const handleTTS = () => {
    const text = TTS.schemeToSpeech(scheme, lang);
    const langCode = lang === 'hi' ? 'hi-IN' : 'en-IN';
    const isPlaying = TTS.toggle(text, langCode);
    setPlaying(isPlaying);
    if (isPlaying) {
      const check = setInterval(() => {
        if (!TTS.speaking) { setPlaying(false); clearInterval(check); }
      }, 500);
    }
  };

  const scoreClass = (s) =>
    s >= 80 ? 'score-excellent' : s >= 60 ? 'score-good' : s >= 40 ? 'score-fair' : 'score-low';

  const scoreLabel = (s) =>
    s >= 80 ? 'Excellent' : s >= 60 ? 'Good' : s >= 40 ? 'Fair' : 'Partial';

  return (
    <div
      className="card animate-fade-up p-0 overflow-hidden"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400" />

      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[0.9375rem] font-bold text-slate-800 leading-snug mb-1">{scheme.name}</h3>
            {scheme.ministry && (
              <p className="text-[0.6875rem] font-medium text-slate-400 uppercase tracking-wider">{scheme.ministry}</p>
            )}
          </div>
          {scheme.relevanceScore !== undefined && (
            <div className="text-center shrink-0">
              <div className={`score-badge ${scoreClass(scheme.relevanceScore)}`}>
                {scheme.relevanceScore}
              </div>
              <p className="text-[0.625rem] text-slate-400 mt-1 font-medium">{scoreLabel(scheme.relevanceScore)}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-[0.8125rem] text-slate-500 leading-relaxed mb-4">{scheme.description}</p>

        {/* Quick info chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(scheme.fundingAmount || scheme.scholarshipAmount) && (
            <span className="tag bg-emerald-50 text-emerald-700">
              {scheme.fundingAmount || scheme.scholarshipAmount}
            </span>
          )}
          <span className="tag bg-blue-50 text-blue-700">
            {scheme.deadline || 'Ongoing'}
          </span>
          {scheme.website && (
            <a href={scheme.website} target="_blank" rel="noopener noreferrer" className="tag bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors no-underline">
              Website ↗
            </a>
          )}
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <p className="text-[0.6875rem] font-semibold text-slate-400 uppercase tracking-wider mb-2">Benefits</p>
          <ul className="space-y-1.5">
            {scheme.benefits?.slice(0, expanded ? undefined : 3).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.8125rem] text-slate-600">
                <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <p className="text-[0.6875rem] font-semibold text-slate-400 uppercase tracking-wider mb-2">Eligibility</p>
              <ul className="space-y-1.5">
                {scheme.eligibility?.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-[0.8125rem] text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.6875rem] font-semibold text-slate-400 uppercase tracking-wider mb-2">How to Apply</p>
              <ol className="space-y-2">
                {scheme.applicationProcess?.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[0.8125rem] text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-[0.625rem] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[0.8125rem] font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {expanded ? '← Less' : 'Details →'}
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-[0.6875rem] font-semibold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
            >
              {lang === 'en' ? 'हिंदी' : 'ENG'}
            </button>
            <button onClick={handleTTS} className={`audio-btn ${playing ? 'playing' : ''}`} title={playing ? 'Stop' : 'Listen'}>
              {playing ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
