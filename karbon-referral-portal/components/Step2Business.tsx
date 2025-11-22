import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, SelectField, RadioGroup } from './ui/Input';
import { StepProps, DiscoverySource, OnboardingTimeline, NotificationStatus } from '../types';
import { ArrowRight, ArrowLeft, Building2 } from 'lucide-react';

const Step2Business: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger([
      'referredCompanyName',
      'referredContactName',
      'referredEmail',
      'referredPhone',
      'transactionValue',
      'notificationStatus',
      'discoverySource',
      'onboardingTimeline'
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-karbon-600" />
          Referred Business Details
        </h2>
        <p className="text-slate-500 mt-1">Tell us about the company you are referring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Business Profile</h3>
        </div>
        
        <TextField 
          label="Company Name" 
          name="referredCompanyName" 
          placeholder="Tech Startup Inc." 
          required 
        />
        <TextField 
          label="Estimated Annual Transaction Value (USD)" 
          name="transactionValue" 
          type="number" 
          placeholder="0.00"
          prefix="$"
          step="0.01"
          required 
        />

        {/* Contact Info */}
        <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Point of Contact</h3>
        </div>

        <TextField 
          label="Contact Person Name" 
          name="referredContactName" 
          placeholder="Jane Doe" 
          required 
        />
        <TextField 
          label="Contact Phone" 
          name="referredPhone" 
          type="tel" 
          placeholder="+1 (555) 999-8888" 
          required 
        />
        <TextField 
          label="Contact Email" 
          name="referredEmail" 
          type="email" 
          placeholder="jane@techstartup.com" 
          required 
        />
        
        <RadioGroup 
            label="Have you notified this contact?" 
            name="notificationStatus" 
            options={Object.values(NotificationStatus)} 
            required 
        />

        {/* Context Info */}
        <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Additional Context</h3>
        </div>

        <SelectField 
          label="How did you hear about the program?" 
          name="discoverySource" 
          options={Object.values(DiscoverySource)} 
          required 
        />
        <SelectField 
          label="Anticipated Onboarding Timeline" 
          name="onboardingTimeline" 
          options={Object.values(OnboardingTimeline)} 
          required 
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbon-500"
        >
          <ArrowLeft className="mr-2 -ml-1 h-5 w-5" />
          Back
        </button>
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

export default Step2Business;