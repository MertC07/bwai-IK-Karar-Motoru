import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <BrainCircuit size={36} color="var(--primary-color)" />
        <h1 className="text-gradient">İK Karar Motoru</h1>
      </div>
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Powered by Gemini AI</span>
      </div>
    </header>
  );
};

export default Header;
