
import React, { forwardRef } from 'react';
import { LOGO_DATA_URI } from '../assets/logo';

interface DocumentPreviewProps {
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
  return (
    <span className={`inline-block px-2 py-0.5 mx-1 rounded border-b-2 ${value ? 'bg-transparent border-black font-bold' : 'bg-yellow-100 border-dashed border-gray-400 text-gray-500'}`}>
      {value || placeholder}
    </span>
  );
};

const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>((props, ref) => {
  const { studentName, dob, guardian1, guardian2, classNameVal, schoolYear, status, cityAndDate } = props;

  return (
    <div ref={ref} className="bg-white w-full h-full p-[2cm] text-black text-sm flex flex-col font-['Arial'] relative">
      {/* Header */}
      <header className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center mb-6">
          <img src={LOGO_DATA_URI} alt="Ícone Colégio e Curso" className="w-48 h-auto" />
        </div>
        
        {/* Address */}
        <div className="text-xs text-gray-400 mt-2 space-y-px leading-tight">
          <p>Estrada do Tindiba, 1782 - Taquara - Rio de Janeiro/RJ - CEP: 22.720-362 Tel: (21) 3900-8299</p>
          <p>CNPJ: 34.614.483/0001-36 - Inscrição Municipal: 1195944-0</p>
          <p>Parecer Favorável p/ Processo no E-03/038/571/2019</p>
          <p>Parecer No: 137/2023/SEEDUC/COOIEMVI - D.O 11/07/2023</p>
          <p>INEP: 33189935</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-10 text-black">
        <h3 className="text-center text-xl font-bold underline mb-10 uppercase tracking-wide">
          Declaração de Transferência
        </h3>
        
        <div className="text-base leading-loose text-justify indent-8">
            Declaramos para devidos fins, que o(a) aluno(a) 
            <VariableBox value={studentName} placeholder="Nome do Aluno" />, 
            nascido(a) em <VariableBox value={dob} placeholder="Data de Nascimento" />, 
            filho(a) de <VariableBox value={guardian1} placeholder="Responsável 1" /> e 
            <VariableBox value={guardian2} placeholder="Responsável 2" />, 
            esteve devidamente matriculado(a) na <VariableBox value={classNameVal} placeholder="Turma" /> 
            no ano letivo de <VariableBox value={schoolYear} placeholder="Ano Letivo" />.
        </div>
        
        <div className="text-base mt-8">
            Situação: <VariableBox value={status} placeholder="Situação Acadêmica" />
        </div>

        <p className="text-base mt-6 italic text-gray-600">
            <strong className="font-bold text-black not-italic">Obs:</strong> Histórico escolar prazo previsto 30 a 45 dias úteis.
        </p>
      </main>

      {/* Signature Section */}
      <section className="mt-16 text-center text-black">
        <p className="text-base mb-12">{cityAndDate || '[Cidade, Data]'}.</p>
        
        <div className="w-64 mx-auto text-sm">
            <div className="border-t border-black w-full mb-2"></div>
            <p className="font-bold">Andréa G. da S. Medeiros</p>
            <p>Secretária Escolar</p>
            <p>Colégio e Curso Ícone</p>
            <p>COOIEMVI/CAD.06001660/24</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 h-20 bg-brand-orange flex items-center justify-center text-white font-sans">
        <div className="flex items-center space-x-6 text-sm">
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
