import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, SelectField, RadioGroup } from './ui/Input';
import { StepProps, DiscoverySource, OnboardingTimeline, NotificationStatus } from '../types';
import { ArrowRight, ArrowLeft, Building2, AlertCircle } from 'lucide-react';

const Step2Business: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { trigger, formState: { errors } } = useFormContext();
  const [showError, setShowError] = useState(false);

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
      setShowError(false);
      onNext();
    } else {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasErrors = !!(
    errors.referredCompanyName ||
    errors.referredContactName ||
    errors.referredEmail ||
    errors.referredPhone ||
    errors.transactionValue ||
    errors.notificationStatus ||
    errors.discoverySource ||
    errors.onboardingTimeline
  );

  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Building2 className="w-6 h-6 text-[#1B56FD]" aria-hidden="true" />
          Referred Business Details
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Tell us about the company you are referring.
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
              {errors.referredCompanyName && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Company:</span> {errors.referredCompanyName.message as string}</span>
                </li>
              )}
              {errors.transactionValue && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Transaction Value:</span> {errors.transactionValue.message as string}</span>
                </li>
              )}
              {errors.referredContactName && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Contact Name:</span> {errors.referredContactName.message as string}</span>
                </li>
              )}
              {errors.referredPhone && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Phone:</span> {errors.referredPhone.message as string}</span>
                </li>
              )}
              {errors.referredEmail && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Email:</span> {errors.referredEmail.message as string}</span>
                </li>
              )}
              {errors.notificationStatus && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Notification:</span> {errors.notificationStatus.message as string}</span>
                </li>
              )}
              {errors.discoverySource && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Discovery Source:</span> {errors.discoverySource.message as string}</span>
                </li>
              )}
              {errors.onboardingTimeline && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><span className="font-medium">Timeline:</span> {errors.onboardingTimeline.message as string}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Business Profile Section */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5 pb-2 border-b border-slate-100">
            Business Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField 
              label="Company Name" 
              name="referredCompanyName" 
              placeholder="Tech Startup Inc." 
              required 
              hideError
            />
            <TextField 
              label="Annual Transaction Volume (USD)" 
              name="transactionValue" 
              type="number" 
              placeholder="500"
              prefix="$"
              step="1"
              min={500}
              max={100000}
              required 
              hideError
            />
          </div>
        </div>

        {/* Point of Contact Section */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5 pb-2 border-b border-slate-100">
            Point of Contact
          </h3>
          <div className="space-y-6">
            {/* First Row: Contact Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField 
                label="Contact Person Name" 
                name="referredContactName" 
                placeholder="Jane Doe" 
                required 
                hideError
              />
              <TextField 
                label="Contact Phone" 
                name="referredPhone" 
                type="tel" 
                placeholder="9876543210"
                maxLength={10}
                required 
                hideError
              />
            </div>
            
            {/* Second Row: Contact Email (full width) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField 
                label="Contact Email" 
                name="referredEmail" 
                type="email" 
                placeholder="jane@techstartup.com" 
                required 
                hideError
              />
            </div>
            
            {/* Third Row: Notification Status (full width) */}
            <div>
              <RadioGroup 
                label="Have you notified this contact?" 
                name="notificationStatus" 
                options={Object.values(NotificationStatus)} 
                required 
                hideError
              />
            </div>
          </div>
        </div>

        {/* Additional Context Section */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5 pb-2 border-b border-slate-100">
            Additional Context
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField 
              label="How did you hear about the program?" 
              name="discoverySource" 
              options={Object.values(DiscoverySource)} 
              required 
              hideError
            />
            <SelectField 
              label="Anticipated Onboarding Timeline" 
              name="onboardingTimeline" 
              options={Object.values(OnboardingTimeline)} 
              required 
              hideError
            />
          </div>
        </div>
      </div>

      {/* Action Buttons - Uniform sizing */}
      <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center min-w-[140px] px-6 py-2.5 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B56FD] transition-all duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back
        </button>
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

export default Step2Business;
