import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  helperText?: string;
  prefix?: string;
}

export const TextField: React.FC<InputProps> = ({ label, name, helperText, prefix, className, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          id={name}
          {...register(name, { valueAsNumber: props.type === 'number' })}
          {...props}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm transition-colors duration-200
            ${prefix ? 'pl-7' : 'pl-3'} pr-3 py-2.5 border
            ${error 
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-300' 
              : 'border-slate-300 focus:ring-karbon-500 focus:border-karbon-500'
            }
            disabled:bg-slate-100 disabled:text-slate-500
            ${className || ''}
          `}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {!error && helperText && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: string[];
}

export const SelectField: React.FC<SelectProps> = ({ label, name, options, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          {...props}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm transition-colors duration-200
            pl-3 pr-10 py-2.5 border bg-white
            ${error 
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
              : 'border-slate-300 focus:ring-karbon-500 focus:border-karbon-500'
            }
          `}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, required }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-6">
        {options.map((opt) => (
          <div key={opt} className="flex items-center">
            <input
              id={`${name}-${opt}`}
              type="radio"
              value={opt}
              {...register(name)}
              className="focus:ring-karbon-500 h-5 w-5 text-karbon-600 border-gray-300"
            />
            <label htmlFor={`${name}-${opt}`} className="ml-2 block text-sm text-slate-900">
              {opt}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};