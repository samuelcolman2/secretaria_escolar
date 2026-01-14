
import React, { useState, useRef, useCallback, useEffect } from 'react';
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

  const [isLoading, setIsLoading] = useState(false);

  const documentRef = useRef<HTMLDivElement>(null);

  const handleGeneratePdf = useCallback(async () => {
    if (!documentRef.current) return;
    setIsLoading(true);

    try {
      const { jsPDF } = window.jspdf;
      // Small timeout to ensure any re-renders are complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await window.html2canvas(documentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
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
    <div className="container mx-auto flex flex-col lg:flex-row gap-8">
      {/* --- Form Section --- */}
      <div className="w-full lg:w-1/3 bg-brand-dark p-6 rounded-lg shadow-lg h-fit sticky top-8 border border-slate-700">
        <h2 className="text-xl font-bold mb-6 border-b pb-2 border-slate-600 text-brand-text">Preencha os Dados</h2>
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
          {isLoading ? 'Gerando PDF...' : 'Baixar Declaração em PDF'}
        </button>
      </div>

      {/* --- Preview Section --- */}
      <div className="w-full lg:w-2/3 flex-grow flex justify-center items-start">
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden scale-[0.9] lg:scale-[1] origin-top">
               <DocumentPreview
                  ref={documentRef}
                  studentName={studentName}
                  dob={dob}
                  guardian1={guardian1}
                  guardian2={guardian2}
                  classNameVal={className}
                  schoolYear={schoolYear}
                  status={status}
                  cityAndDate={cityAndDate}
              />
          </div>
      </div>
    </div>
  );
};

export default Generator;
