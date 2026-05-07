import React from 'react';
import { Plus, Trash2, User } from 'lucide-react';

const CandidateList = ({ candidates, setCandidates }) => {
  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { id: Date.now().toString(), name: '', profile: '' }
    ]);
  };

  const removeCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const updateCandidate = (id, field, value) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="glass-panel">
      <div className="header" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>2. Aday Profilleri</h2>
        <button className="btn btn-outline" onClick={addCandidate}>
          <Plus size={18} /> Yeni Aday Ekle
        </button>
      </div>

      {candidates.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
          Henüz aday eklemediniz. "Yeni Aday Ekle" butonu ile başlayın.
        </p>
      ) : (
        candidates.map((candidate, index) => (
          <div key={candidate.id} className="candidate-card glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem' }}>
            <div className="candidate-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <User size={18} /> Aday {index + 1}
              </h3>
              <button 
                className="btn btn-danger" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                onClick={() => removeCandidate(candidate.id)}
              >
                <Trash2 size={16} /> Sil
              </button>
            </div>
            
            <div className="input-group">
              <label>Ad Soyad</label>
              <input
                type="text"
                placeholder="Örn: Ahmet Yılmaz"
                value={candidate.name}
                onChange={(e) => updateCandidate(candidate.id, 'name', e.target.value)}
              />
            </div>
            
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Özgeçmiş / Deneyimler</label>
              <textarea
                placeholder="Örn: 4 yıl React tecrübesi, E-ticaret projelerinde çalıştı..."
                value={candidate.profile}
                onChange={(e) => updateCandidate(candidate.id, 'profile', e.target.value)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CandidateList;
