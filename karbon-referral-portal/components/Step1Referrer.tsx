import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from './ui/Input';
import { StepProps } from '../types';
import { ArrowRight, User, AlertCircle } from 'lucide-react';

const Step1Referrer: React.FC<StepProps> = ({ onNext }) => {
  const { trigger, formState: { errors } } = useFormContext();
  const [showError, setShowError] = useState(false);

  const handleNext = async () => {
    const isValid = await trigger([
      'referrerName',
      'referrerEmail',
      'referrerPhone',
      'referrerCompany'
    ]);
    
    if (isValid) {
      setShowError(false);
      onNext();
    } else {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasErrors = !!(
    errors.referrerName ||
    errors.referrerEmail ||
    errors.referrerPhone ||
    errors.referrerCompany
  );

  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <User className="w-6 h-6 text-[#1B56FD]" aria-hidden="true" />
          Referrer Information
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Please provide your contact details so we can track this referral.
        </p>
      </div>

      {/* Consolidated Error Message */}
      {showError && hasErrors && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-800 mb-2">
              Please complete all required fields
            </h3>
            <ul className="text-sm text-red-700 space-y-1 list-none">
              {errors.referrerName && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Name:</span> {errors.referrerName.message as string}</span>
                </li>
              )}
              {errors.referrerEmail && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Email:</span> {errors.referrerEmail.message as string}</span>
                </li>
              )}
              {errors.referrerPhone && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Phone:</span> {errors.referrerPhone.message as string}</span>
                </li>
              )}
              {errors.referrerCompany && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Company:</span> {errors.referrerCompany.message as string}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField 
          label="Your Name" 
          name="referrerName" 
          placeholder="e.g. John Smith" 
          required 
          hideError
        />
        <TextField 
          label="Your Email" 
          name="referrerEmail" 
          type="email" 
          placeholder="john@example.com" 
          required 
          hideError
        />
        <TextField 
          label="Your Phone" 
          name="referrerPhone" 
          type="tel" 
          placeholder="9876543210"
          maxLength={10}
          required 
          hideError
        />
        <TextField 
          label="Your Company" 
          name="referrerCompany" 
          placeholder="Acme Corp" 
          required 
          hideError
        />
      </div>

      {/* Action Buttons - Uniform sizing */}
      <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center min-w-[140px] px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#1B56FD] hover:bg-[#1547E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B56FD] transition-all duration-200"
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Step1Referrer;
