import React from 'react';

const JobForm = ({ jobDescription, setJobDescription, requiredSkills, setRequiredSkills }) => {
  return (
    <div className="glass-panel">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>1. İş Tanımı ve Beklentiler</h2>
      
      <div className="input-group">
        <label htmlFor="jobDescription">İş Tanımı (Job Description)</label>
        <textarea
          id="jobDescription"
          placeholder="Örn: Şirketimizin yazılım ekibi için, kullanıcı dostu arayüzler geliştirecek Frontend Developer arıyoruz..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="requiredSkills">Aranan Yetkinlikler (Required Skills)</label>
        <textarea
          id="requiredSkills"
          placeholder="Örn: React, TypeScript, Vanilla CSS, minimum 3 yıl deneyim..."
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JobForm;
