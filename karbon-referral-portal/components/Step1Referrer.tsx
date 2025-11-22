import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from './ui/Input';
import { StepProps } from '../types';
import { ArrowRight, User } from 'lucide-react';

const Step1Referrer: React.FC<StepProps> = ({ onNext }) => {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger([
      'referrerName',
      'referrerEmail',
      'referrerPhone',
      'referrerCompany'
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <User className="w-6 h-6 text-karbon-600" />
          Referrer Information
        </h2>
        <p className="text-slate-500 mt-1">Please provide your contact details so we can track this referral.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField 
          label="Your Name" 
          name="referrerName" 
          placeholder="e.g. John Smith" 
          required 
        />
        <TextField 
          label="Your Email" 
          name="referrerEmail" 
          type="email" 
          placeholder="john@example.com" 
          required 
        />
        <TextField 
          label="Your Phone" 
          name="referrerPhone" 
          type="tel" 
          placeholder="+1 (555) 000-0000" 
          required 
        />
        <TextField 
          label="Your Company" 
          name="referrerCompany" 
          placeholder="Acme Corp" 
          required 
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-karbon-600 hover:bg-karbon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbon-500 transition-colors"
        >
          Next Step
          <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1Referrer;