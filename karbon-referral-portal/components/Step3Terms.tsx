import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StepProps } from '../types';
import { ArrowLeft, CheckCircle, ShieldCheck, FileText } from 'lucide-react';

interface Step3Props extends StepProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

const Step3Terms: React.FC<Step3Props> = ({ onBack, onSubmit, isSubmitting }) => {
  const { register, formState: { errors, isValid }, watch } = useFormContext();
  const acceptedTerms = watch('acceptedTerms');

  return (
    <div className="animate-fadeIn">
       <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-karbon-600" />
          Terms & Conditions
        </h2>
        <p className="text-slate-500 mt-1">Please review and accept the referral program terms.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
        <div className="h-64 overflow-y-auto pr-2 text-sm text-slate-600 space-y-4 custom-scrollbar">
          <h3 className="font-bold text-slate-800">KARBON REFERRAL PROGRAM TERMS AND CONDITIONS</h3>
          
          <p><strong>1. DEFINITION</strong><br/>The Karbon Referral Program ("Program") is designed to reward customers and partners who refer new businesses to Karbon's payment platform.</p>

          <p><strong>2. ELIGIBILITY</strong><br/>Only individuals authorized to represent a business may submit referrals. Referrers must be existing Karbon customers or authorized partners. Referred businesses must not currently have a Karbon account.</p>

          <p><strong>3. REWARD STRUCTURE</strong><br/>Commission structure will be communicated separately upon approval. Payment terms are Net 30 days after the referred business successfully onboards and processes their first transaction.</p>

          <p><strong>4. CONFIDENTIALITY</strong><br/>Referrers agree to maintain confidentiality of Karbon business terms, pricing, and any non-public information acquired during the referral process.</p>

          <p><strong>5. LIMITATION OF LIABILITY</strong><br/>Karbon is not liable for referral disputes, commission disagreements, or compliance issues arising from the referred business's activities.</p>

          <p><strong>6. DATA PRIVACY</strong><br/>By submitting this form, you acknowledge that you have obtained necessary consent from the referred party to share their contact information with Karbon for business purposes.</p>
          
          <p><strong>7. MODIFICATION</strong><br/>Karbon reserves the right to modify or terminate this Program with 30 days' notice to all active referrers.</p>
          
          <p className="text-xs text-slate-400 italic">Last Updated: November 22, 2025</p>
        </div>
      </div>

      <div className="flex items-start mb-8">
        <div className="flex items-center h-5">
          <input
            id="acceptedTerms"
            type="checkbox"
            {...register('acceptedTerms')}
            className="focus:ring-karbon-500 h-5 w-5 text-karbon-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptedTerms" className="font-medium text-slate-700">
            I have read and agree to the terms and conditions
          </label>
          {errors.acceptedTerms && (
            <p className="text-red-600 mt-1">{errors.acceptedTerms.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbon-500 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 -ml-1 h-5 w-5" />
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!acceptedTerms || isSubmitting}
          className={`
            inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white
            transition-all duration-200
            ${!acceptedTerms || isSubmitting
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Referral
              <CheckCircle className="ml-2 -mr-1 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3Terms;