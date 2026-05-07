import React from 'react';
import { Award, CheckCircle, XCircle, TrendingUp, BarChart2 } from 'lucide-react';

const ResultsDashboard = ({ results }) => {
  if (!results) return null;

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-med';
    return 'score-low';
  };

  return (
    <div className="results-container">
      <div className="hero-winner glass-panel" style={{ marginBottom: '2rem' }}>
        <Award size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
          Önerilen Aday
        </h3>
        <h2 className="text-gradient">{results.recommendedCandidate}</h2>
        <p>{results.justification}</p>
      </div>

      <div className="glass-panel table-container">
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={20} /> Aday Karşılaştırma Tablosu
        </h3>
        
        <table>
          <thead>
            <tr>
              <th>Aday</th>
              <th>Özet</th>
              <th style={{ textAlign: 'center' }}>Skorlar</th>
              <th>Artılar</th>
              <th>Eksiler</th>
            </tr>
          </thead>
          <tbody>
            {results.candidates && results.candidates.map((candidate, i) => (
              <tr key={i} style={results.recommendedCandidate === candidate.name ? { background: 'rgba(99, 102, 241, 0.05)' } : {}}>
                <td style={{ fontWeight: 600 }}>{candidate.name}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '250px' }}>
                  {candidate.summary}
                </td>
                <td style={{ textAlign: 'center', minWidth: '120px' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', display: 'block', color: 'var(--text-muted)' }}>Deneyim</span>
                    <span className={`score-badge ${getScoreClass(candidate.experienceScore)}`}>
                      {candidate.experienceScore}/100
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', display: 'block', color: 'var(--text-muted)' }}>Yetkinlik</span>
                    <span className={`score-badge ${getScoreClass(candidate.skillScore)}`}>
                      {candidate.skillScore}/100
                    </span>
                  </div>
                </td>
                <td>
                  <ul className="pros">
                    {candidate.pros && candidate.pros.map((pro, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <CheckCircle size={14} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className="cons">
                    {candidate.cons && candidate.cons.map((con, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <XCircle size={14} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsDashboard;
