
import React from 'react';
import Card from '../components/Card';

interface DashboardProps {
    setPage: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setPage }) => {
  return (
    <div className="container mx-auto">
        <p className="text-brand-text-dim mb-8">Selecione um tipo de documento para começar.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card 
                title="Declaração de Transferência"
                onClick={() => setPage('generator')}
            />
            {/* Adicione novos cards de documentos aqui no futuro */}
        </div>
    </div>
  );
};

export default Dashboard;
