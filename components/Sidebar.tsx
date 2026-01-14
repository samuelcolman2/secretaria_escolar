
import React, { useState } from 'react';
import { LOGO_DATA_URI } from '../assets/logo';

const DocumentTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const isDocumentSectionActive = currentPage === 'dashboard' || currentPage === 'generator';

    return (
        <aside 
            className={`${
                isCollapsed ? 'w-20' : 'w-64'
            } bg-brand-dark text-brand-text flex flex-col p-4 shadow-lg border-r border-slate-700 transition-all duration-300 relative`}
        >
            {/* Toggle Button - Centered Vertically */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 bg-brand-orange text-white rounded-full p-1 shadow-md hover:bg-orange-600 transition-colors border border-brand-dark z-50"
                title={isCollapsed ? "Expandir menu" : "Recolher menu"}
            >
                {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </button>

            {/* Logo Section - Adapts size based on collapse state */}
            <div className="mb-8 flex justify-center transition-all duration-300">
                 <img 
                    src={LOGO_DATA_URI}
                    alt="Ícone Colégio e Curso Logo" 
                    className={`transition-all duration-300 ${isCollapsed ? 'w-10' : 'w-24'} mx-auto`}
                />
            </div>

            <nav className="flex-1 overflow-hidden">
                <ul>
                    <li>
                        <button
                            onClick={() => setPage('dashboard')}
                            className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                                isDocumentSectionActive
                                    ? 'bg-brand-orange text-white font-semibold'
                                    : 'hover:bg-slate-700'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                            title="Criar Documentos"
                        >
                            <div className="flex items-center gap-3">
                                <DocumentTextIcon />
                                <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
                                    Criar Documentos
                                </span>
                            </div>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
