export default function ComparisonTable({ schemes, schemeType }) {
  if (!schemes || schemes.length === 0) return null;

  const scoreClass = (s) =>
    s >= 80 ? 'score-excellent' : s >= 60 ? 'score-good' : s >= 40 ? 'score-fair' : 'score-low';

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="min-w-[200px]">Scheme</th>
            <th className="min-w-[120px]">{schemeType === 'business' ? 'Funding' : 'Scholarship'}</th>
            <th className="min-w-[200px]">Key Benefits</th>
            <th className="min-w-[180px]">Eligibility</th>
            <th>Deadline</th>
            <th className="text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme, idx) => (
            <tr key={scheme._id || idx}>
              <td className="font-semibold text-slate-700">
                <span className="mr-1.5">{medals[idx] || ''}</span>
                {scheme.name}
              </td>
              <td>
                <span className="tag bg-emerald-50 text-emerald-700">
                  {scheme.fundingAmount || scheme.scholarshipAmount || 'N/A'}
                </span>
              </td>
              <td>
                <ul className="space-y-1">
                  {scheme.benefits?.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-slate-500">
                      <svg className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs">{b}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="space-y-1">
                  {scheme.eligibility?.slice(0, 2).map((e, i) => (
                    <li key={i} className="text-xs text-slate-400">• {e}</li>
                  ))}
                </ul>
              </td>
              <td>
                <span className="tag bg-blue-50 text-blue-700">{scheme.deadline || 'Ongoing'}</span>
              </td>
              <td className="text-center">
                {scheme.relevanceScore !== undefined && (
                  <div className={`score-badge mx-auto ${scoreClass(scheme.relevanceScore)}`}>
                    {scheme.relevanceScore}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
