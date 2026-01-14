
import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-dim mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Digite ${label.toLowerCase()}`}
        className="block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-brand-text focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm transition"
      />
    </div>
  );
};

export default FormField;
