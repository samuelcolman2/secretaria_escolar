
import React from 'react';

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


interface CardProps {
  title: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, onClick }) => {
  return (
    <div className="bg-brand-dark rounded-xl p-6 flex flex-col gap-4 border border-slate-700 hover:border-slate-600 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700">
            <DocumentIcon />
        </div>
        <h3 className="text-lg font-bold text-brand-text">{title}</h3>
      </div>
      <button
        onClick={onClick}
        className="mt-2 w-full bg-brand-purple hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20 hover:shadow-glow-purple"
      >
        Acessar <ExternalLinkIcon />
      </button>
    </div>
  );
};

export default Card;
