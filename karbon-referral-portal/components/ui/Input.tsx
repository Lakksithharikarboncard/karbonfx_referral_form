import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CircleAlert } from 'lucide-react';

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
  step?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  disabled?: boolean;
  hideError?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  prefix,
  step,
  min,
  max,
  maxLength,
  disabled = false,
  hideError = false,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const error = errors[name];
  const hasError = !!error;

  // Handle input to enforce max value for number inputs
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'number' && max !== undefined) {
      const value = parseFloat(e.currentTarget.value);
      if (value > max) {
        e.currentTarget.value = max.toString();
        setValue(name, max.toString());
      }
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium select-none">
            {prefix}
          </span>
        )}
        <input
          id={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onInput={handleInput}
          className={`
            block w-full rounded-lg shadow-sm text-sm transition-all duration-200
            ${prefix ? 'pl-8 pr-3' : 'pl-3 pr-3'} py-2.5 border
            ${
              hasError
                ? 'border-red-300 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-red-300'
                : 'border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#1B56FD] focus:border-[#1B56FD] placeholder-slate-400'
            }
            disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
            ${hasError && !hideError ? 'pr-10' : ''}
          `}
          type={type}
          step={step}
          min={min}
          max={max}
          maxLength={maxLength}
          {...register(name)}
        />
        {hasError && !hideError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CircleAlert className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {!hideError && error && (
        <p className="mt-2 text-sm text-red-600" role="alert">{error.message as string}</p>
      )}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  hideError?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  required = false,
  hideError = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const hasError = !!error;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        className={`
          block w-full rounded-lg shadow-sm text-sm transition-all duration-200
          px-3 py-2.5 border appearance-none bg-white
          ${
            hasError
              ? 'border-red-300 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#1B56FD] focus:border-[#1B56FD]'
          }
        `}
        {...register(name)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {!hideError && error && (
        <p className="mt-2 text-sm text-red-600" role="alert">{error.message as string}</p>
      )}
    </div>
  );
};

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  hideError?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  required = false,
  hideError = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              value={option}
              className="w-4 h-4 text-[#1B56FD] focus:ring-2 focus:ring-[#1B56FD] focus:ring-offset-2 border-slate-300 transition-all duration-200"
              {...register(name)}
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{option}</span>
          </label>
        ))}
      </div>
      {!hideError && error && (
        <p className="mt-2 text-sm text-red-600" role="alert">{error.message as string}</p>
      )}
    </div>
  );
};
