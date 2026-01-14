
import React, { useState, useRef, useCallback } from 'react';
import type { jsPDF } from 'jspdf';
import type html2canvas from 'html2canvas';

import DocumentPreview from '../components/DocumentPreview';
import FormField from '../components/FormField';

// Extend the Window interface to include the jsPDF and html2canvas libraries
declare global {
  interface Window {
    jspdf: {
      jsPDF: typeof jsPDF;
    };
    html2canvas: typeof html2canvas;
  }
}

const Generator: React.FC = () => {
  // Helper to generate the current date string
  const getCurrentDateString = () => {
    const date = new Date();
    const day = date.getDate();
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `Rio de Janeiro, ${day} de ${month} de ${year}`;
  };

  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [guardian1, setGuardian1] = useState('');
  const [guardian2, setGuardian2] = useState('');
  const [className, setClassName] = useState('');
  
  // Updated default values
  const [schoolYear, setSchoolYear] = useState('2026');
  const [status, setStatus] = useState('Aprovado(a)');
  const [cityAndDate, setCityAndDate] = useState(getCurrentDateString());
  
  // State for custom logo
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogo(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGeneratePdf = useCallback(async () => {
    if (!documentRef.current) return;
    setIsLoading(true);

    try {
      const { jsPDF } = window.jspdf;
      
      // Allow time for React to render the "Print Mode" (responsive=false) version
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const element = documentRef.current;
      
      const canvas = await window.html2canvas(element, {
        scale: 3, // High quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollY: 0,
        windowWidth: 1000, 
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      pdf.save(`declaracao-transferencia-${studentName.replace(/\s/g, '_') || 'documento'}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [studentName]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-8 h-[calc(100vh-100px)]">
      {/* Styles for the custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b; /* Dark Slate background */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0F172A; /* The requested color */
          border: 1px solid #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1e293b;
        }
      `}</style>

      {/* --- Form Section --- */}
      <div className="w-full lg:w-1/3 bg-brand-dark p-6 rounded-lg shadow-lg h-full overflow-y-auto custom-scrollbar border border-slate-700">
        <h2 className="text-xl font-bold mb-6 border-b pb-2 border-slate-600 text-brand-text">Preencha os Dados</h2>
        
        {/* Logo Upload */}
        <div className="mb-6">
            <label className="block text-sm font-medium text-brand-text-dim mb-2">Logo da Instituição</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 hover:border-brand-purple transition-all">
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                        {customLogo ? (
                             <img src={customLogo} alt="Preview" className="h-16 object-contain" />
                        ) : (
                            <>
                                <svg className="w-6 h-6 mb-2 text-brand-text-dim" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="text-xs text-brand-text-dim"><span className="font-semibold text-brand-purple">Clique para enviar</span></p>
                            </>
                        )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </label>
            </div>
             {customLogo && (
                <button 
                    onClick={() => setCustomLogo(null)}
                    className="text-xs text-red-400 hover:text-red-300 mt-1 underline w-full text-center"
                >
                    Remover
                </button>
            )}
        </div>

        <div className="space-y-4">
          <FormField label="Nome do Aluno(a)" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          <FormField label="Data de Nascimento" value={dob} onChange={(e) => setDob(e.target.value)} />
          <FormField label="Responsável 1" value={guardian1} onChange={(e) => setGuardian1(e.target.value)} />
          <FormField label="Responsável 2" value={guardian2} onChange={(e) => setGuardian2(e.target.value)} />
          <FormField label="Turma / Série" value={className} onChange={(e) => setClassName(e.target.value)} />
          <FormField label="Ano Letivo" value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} />
          <FormField label="Situação" value={status} onChange={(e) => setStatus(e.target.value)} />
          <FormField label="Cidade e Data" value={cityAndDate} onChange={(e) => setCityAndDate(e.target.value)} />
        </div>
        <button
          onClick={handleGeneratePdf}
          disabled={isLoading}
          className="mt-8 w-full bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg py-3 px-6 rounded-md transition duration-200 ease-in-out shadow-md"
        >
          {isLoading ? 'Gerando PDF...' : 'Baixar Declaração'}
        </button>
      </div>

      {/* --- Preview Section --- */}
      <div className="w-full lg:w-2/3 bg-slate-800/50 rounded flex flex-col p-4 relative overflow-y-auto custom-scrollbar">
          {/* 
            Wrapper for the dashed border. 
            It hugs the DocumentPreview content instead of the parent container.
            'w-full' ensures it spans width. 'h-auto' ensures it doesn't stretch empty space.
          */}
          <div className="w-full relative h-auto border border-dashed border-slate-700 bg-transparent">
               <DocumentPreview
                  ref={documentRef}
                  logo={customLogo}
                  studentName={studentName}
                  dob={dob}
                  guardian1={guardian1}
                  guardian2={guardian2}
                  classNameVal={className}
                  schoolYear={schoolYear}
                  status={status}
                  cityAndDate={cityAndDate}
                  responsive={!isLoading}
              />
              
              {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-50 text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mb-4"></div>
                      <p>Gerando PDF em alta qualidade...</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default Generator;
