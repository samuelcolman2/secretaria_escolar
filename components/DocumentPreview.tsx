
import React, { forwardRef } from 'react';

interface DocumentPreviewProps {
  logo?: string | null;
  studentName: string;
  dob: string;
  guardian1: string;
  guardian2: string;
  classNameVal: string;
  schoolYear: string;
  status: string;
  cityAndDate: string;
  responsive?: boolean; // New prop to control layout mode
}

// Helper component for variable fields (Boxes)
const VariableBox: React.FC<{ value: string; placeholder: string }> = ({ value, placeholder }) => {
  return <span className="font-bold">{value || placeholder}</span>;
};

const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>((props, ref) => {
  const { logo, studentName, dob, guardian1, guardian2, classNameVal, schoolYear, status, cityAndDate, responsive = false } = props;

  // Conditional classes based on the 'responsive' prop
  // Responsive: Fills parent WIDTH, but maintains A4 Aspect Ratio.
  // Print (Default): Strict A4 mm dimensions.
  
  const containerClass = responsive
    ? "bg-white relative w-full text-black font-['Arial'] flex flex-col shadow-lg"
    : "bg-white relative w-[210mm] h-[297mm] text-black text-sm font-['Arial'] overflow-hidden shadow-none mx-auto";

  // Use inline style for aspect ratio in responsive mode to behave like a real page
  const containerStyle = responsive ? { aspectRatio: '210/297' } : {};

  const paddingClass = responsive
    ? "p-8 lg:p-12 flex-grow flex flex-col"
    : "p-[2cm] pt-[1.5cm] h-full flex flex-col";

  const footerClass = responsive
    ? "bg-brand-orange text-white font-sans p-4 flex items-center justify-center mt-auto shrink-0"
    : "absolute bottom-0 left-0 w-full h-20 bg-brand-orange flex items-center justify-center text-white font-sans";

  return (
    <div ref={ref} className={containerClass} style={containerStyle}>
      <div className={paddingClass}>
        
        {/* Header */}
        <header className="flex flex-col items-center text-center shrink-0">
          <div className={`mb-2 flex items-center justify-center ${responsive ? 'h-16 lg:h-20' : 'h-24'}`}>
            {logo ? (
               <img src={logo} alt="Logo Instituição" className="h-full w-auto object-contain" />
            ) : (
               <div className="w-full h-full" /> 
            )}
          </div>
          
          {/* Address */}
          <div className={`${responsive ? 'text-[9px] lg:text-[10px]' : 'text-[10px]'} text-gray-400 space-y-px leading-tight`}>
            <p>Estrada do Tindiba, 1782 - Taquara - Rio de Janeiro/RJ - CEP: 22.720-362 Tel: (21) 3900-8299</p>
            <p>CNPJ: 34.614.483/0001-36 - Inscrição Municipal: 1195944-0</p>
            <p>Parecer Favorável p/ Processo no E-03/038/571/2019</p>
            <p>Parecer No: 137/2023/SEEDUC/COOIEMVI - D.O 11/07/2023</p>
            <p>INEP: 33189935</p>
          </div>
        </header>

        {/* Main Body */}
        <main className={`text-black flex-grow flex flex-col ${responsive ? 'justify-start mt-8' : 'mt-10'}`}>
          <h3 className="text-center text-lg font-bold underline mb-6 uppercase tracking-wide shrink-0">
            Declaração de Transferência
          </h3>
          
          <div className={`${responsive ? 'text-sm lg:text-base' : 'text-sm md:text-base'} leading-relaxed text-justify indent-8`}>
              Declaramos para devidos fins, que o(a) aluno(a) 
              <VariableBox value={studentName} placeholder="Nome do Aluno" />, 
              nascido(a) em <VariableBox value={dob} placeholder="Data de Nascimento" />, 
              filho(a) de <VariableBox value={guardian1} placeholder="Responsável 1" /> e 
              <VariableBox value={guardian2} placeholder="Responsável 2" />, 
              esteve devidamente matriculado(a) na <VariableBox value={classNameVal} placeholder="Turma" /> 
              no ano letivo de <VariableBox value={schoolYear} placeholder="Ano Letivo" />.
          </div>
          
          <div className={`${responsive ? 'text-sm lg:text-base' : 'text-sm md:text-base'} mt-8 font-semibold`}>
              Situação: <VariableBox value={status} placeholder="Situação Acadêmica" />
          </div>

          <p className="text-sm mt-6 italic text-gray-600">
              <strong className="font-bold text-black not-italic">Obs:</strong> Histórico escolar prazo previsto 30 a 45 dias úteis.
          </p>
        </main>

        {/* Signature Section */}
        <section className={`text-center text-black shrink-0 ${responsive ? 'mb-4 mt-8' : 'mt-auto mb-20'}`}>
          <p className="text-base mb-6">{cityAndDate || '[Cidade, Data]'}.</p>
          
          <div className="w-64 mx-auto text-sm">
              <div className="border-t border-black w-full mb-2"></div>
              <p className="font-bold">Andréa G. da S. Medeiros</p>
              <p>Secretária Escolar</p>
              <p>Colégio e Curso Ícone</p>
              <p>COOIEMVI/CAD.06001660/24</p>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className={footerClass}>
        <div className="flex items-center space-x-2 md:space-x-4 text-[10px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            <div className="flex items-center space-x-2">
                <span className="font-bold text-xl md:text-2xl italic font-serif">i</span>
                <span>iconecolegioecurso.com.br</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span>(21) 3900-8299</span>
            <span className="hidden sm:inline">|</span>
            <div className="flex items-center space-x-1">
                <span>@iconecolegioecursooficial</span>
            </div>
        </div>
      </footer>
    </div>
  );
});

export default DocumentPreview;
