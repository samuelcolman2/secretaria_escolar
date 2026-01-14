
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
}

// Helper component for variable fields (Boxes)
const VariableBox: React.FC<{ value: string; placeholder: string }> = ({ value, placeholder }) => {
  // Removed yellow background and dashed borders.
  // Displays value if present, otherwise displays the placeholder text, both in bold.
  return <span className="font-bold">{value || placeholder}</span>;
};

const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>((props, ref) => {
  const { logo, studentName, dob, guardian1, guardian2, classNameVal, schoolYear, status, cityAndDate } = props;

  return (
    // Main Container: Strict A4 Size, Relative for absolute footer positioning, Overflow Hidden to prevent aspect ratio distortion
    <div 
        ref={ref} 
        className="bg-white relative w-[210mm] h-[297mm] text-black text-sm font-['Arial'] overflow-hidden shadow-none"
    >
      {/* Content Padding Wrapper */}
      <div className="p-[2cm] pt-[1.5cm] h-full flex flex-col">
        
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <div className="mb-2 h-24 flex items-center justify-center">
            {logo ? (
               <img src={logo} alt="Logo Instituição" className="h-full w-auto object-contain" />
            ) : (
               <div className="w-full h-full" /> 
            )}
          </div>
          
          {/* Address */}
          <div className="text-[10px] text-gray-400 space-y-px leading-tight">
            <p>Estrada do Tindiba, 1782 - Taquara - Rio de Janeiro/RJ - CEP: 22.720-362 Tel: (21) 3900-8299</p>
            <p>CNPJ: 34.614.483/0001-36 - Inscrição Municipal: 1195944-0</p>
            <p>Parecer Favorável p/ Processo no E-03/038/571/2019</p>
            <p>Parecer No: 137/2023/SEEDUC/COOIEMVI - D.O 11/07/2023</p>
            <p>INEP: 33189935</p>
          </div>
        </header>

        {/* Main Body */}
        <main className="mt-10 text-black flex-grow">
          <h3 className="text-center text-lg font-bold underline mb-10 uppercase tracking-wide">
            Declaração de Transferência
          </h3>
          
          <div className="text-sm md:text-base leading-relaxed text-justify indent-8">
              Declaramos para devidos fins, que o(a) aluno(a) 
              <VariableBox value={studentName} placeholder="Nome do Aluno" />, 
              nascido(a) em <VariableBox value={dob} placeholder="Data de Nascimento" />, 
              filho(a) de <VariableBox value={guardian1} placeholder="Responsável 1" /> e 
              <VariableBox value={guardian2} placeholder="Responsável 2" />, 
              esteve devidamente matriculado(a) na <VariableBox value={classNameVal} placeholder="Turma" /> 
              no ano letivo de <VariableBox value={schoolYear} placeholder="Ano Letivo" />.
          </div>
          
          <div className="text-sm md:text-base mt-8 font-semibold">
              Situação: <VariableBox value={status} placeholder="Situação Acadêmica" />
          </div>

          <p className="text-sm mt-6 italic text-gray-600">
              <strong className="font-bold text-black not-italic">Obs:</strong> Histórico escolar prazo previsto 30 a 45 dias úteis.
          </p>
        </main>

        {/* Signature Section */}
        <section className="mt-auto mb-20 text-center text-black">
          <p className="text-base mb-8">{cityAndDate || '[Cidade, Data]'}.</p>
          
          <div className="w-64 mx-auto text-sm">
              <div className="border-t border-black w-full mb-2"></div>
              <p className="font-bold">Andréa G. da S. Medeiros</p>
              <p>Secretária Escolar</p>
              <p>Colégio e Curso Ícone</p>
              <p>COOIEMVI/CAD.06001660/24</p>
          </div>
        </section>

      </div>

      {/* Footer - Absolute positioned at bottom */}
      <footer className="absolute bottom-0 left-0 w-full h-20 bg-brand-orange flex items-center justify-center text-white font-sans">
        <div className="flex items-center space-x-4 text-xs md:text-sm">
            <div className="flex items-center space-x-2">
                <span className="font-bold text-2xl italic font-serif">i</span>
                <span>iconecolegioecurso.com.br</span>
            </div>
            <span>|</span>
            <span>(21) 3900-8299</span>
            <span>|</span>
            <div className="flex items-center space-x-1">
                <span>@iconecolegioecursooficial</span>
            </div>
        </div>
      </footer>
    </div>
  );
});

export default DocumentPreview;
