
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';

const App: React.FC = () => {
  const [page, setPage] = useState('dashboard'); // 'dashboard' or 'generator'

  const getPageTitle = () => {
    switch (page) {
      case 'generator':
        return 'Gerador de Declaração de Transferência';
      case 'dashboard':
      default:
        return 'Criar Documentos';
    }
  };

  return (
    <div className="flex h-screen font-sans bg-brand-bg text-brand-text">
      <Sidebar currentPage={page} setPage={setPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-brand-dark shadow-sm p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold text-brand-text">
            {getPageTitle()}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {page === 'dashboard' && <Dashboard setPage={setPage} />}
          {page === 'generator' && <Generator />}
        </main>
      </div>
    </div>
  );
};

export default App;
