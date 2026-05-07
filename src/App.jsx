import React, { useState } from 'react';
import Header from './components/Header';
import JobForm from './components/JobForm';
import CandidateList from './components/CandidateList';
import ResultsDashboard from './components/ResultsDashboard';
import { evaluateCandidates } from './services/geminiService';
import { Loader2 } from 'lucide-react';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [candidates, setCandidates] = useState([
    { id: '1', name: '', profile: '' }
  ]);
  
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    // Validation
    if (!jobDescription.trim() || !requiredSkills.trim()) {
      setError('Lütfen iş tanımı ve aranan yetkinlikleri doldurun.');
      return;
    }

    const validCandidates = candidates.filter(c => c.name.trim() && c.profile.trim());
    if (validCandidates.length === 0) {
      setError('Lütfen en az bir adayın bilgilerini (Ad ve Özgeçmiş) tam olarak doldurun.');
      return;
    }

    setError('');
    setIsLoading(true);
    setResults(null);

    try {
      // Map valid candidates to hide IDs if not needed, but we keep them to track back
      const dataToAnalyze = validCandidates.map(c => ({
        id: c.id,
        name: c.name,
        profile: c.profile
      }));

      const analysisResults = await evaluateCandidates(jobDescription, requiredSkills, dataToAnalyze);
      setResults(analysisResults);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Analiz sırasında bir hata oluştu. API anahtarınızı ve internet bağlantınızı kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      {error && (
        <div className="glass-panel" style={{ borderLeft: '4px solid var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <p style={{ color: '#f87171', margin: 0, fontWeight: 500 }}>{error}</p>
        </div>
      )}

      <div className="main-grid">
        <JobForm 
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          requiredSkills={requiredSkills}
          setRequiredSkills={setRequiredSkills}
        />
        <CandidateList 
          candidates={candidates}
          setCandidates={setCandidates}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 2rem 0' }}>
        <button 
          className="btn btn-primary" 
          style={{ fontSize: '1.2rem', padding: '1rem 3rem', borderRadius: '50px' }}
          onClick={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="spinner" size={24} /> Analiz Ediliyor...
            </>
          ) : (
            'Adayları Analiz Et'
          )}
        </button>
      </div>

      {results && <ResultsDashboard results={results} />}
    </div>
  );
}

export default App;
