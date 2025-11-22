import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReferralFormData, referralSchema, defaultValues } from './types';
import { submitReferral } from './services/airtableApi';
import Stepper from './components/Stepper';
import Step1Referrer from './components/Step1Referrer';
import Step2Business from './components/Step2Business';
import Step3Terms from './components/Step3Terms';
import Step4Thanks from './components/Step4Thanks';
import { trackClarityEvent, setClarityTag, ClarityEvents } from '/workspaces/karbonfx_referral_form/karbon-referral-portal/src/utils/clarity.ts';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ recordId: string } | null>(null);

  const methods = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues,
    mode: 'onChange' 
  });

  // Track initial page load
  useEffect(() => {
    trackClarityEvent(ClarityEvents.PAGE_LOAD);
    setClarityTag('form_type', 'referral');
  }, []);

  // Track step changes
  useEffect(() => {
    trackClarityEvent(ClarityEvents.STEP_VIEWED, { step: currentStep });
    setClarityTag('current_step', currentStep.toString());
  }, [currentStep]);

  // Persistence Logic
  useEffect(() => {
    const savedData = localStorage.getItem('karbon_referral_draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        methods.reset(parsed);
        trackClarityEvent('form_resumed_from_draft');
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem('karbon_referral_draft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  // Navigation Handlers with Tracking
  const nextStep = () => {
    trackClarityEvent(ClarityEvents.NEXT_CLICKED, { from_step: currentStep });
    trackClarityEvent(ClarityEvents.STEP_COMPLETED, { step: currentStep });
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    trackClarityEvent(ClarityEvents.BACK_CLICKED, { from_step: currentStep });
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submission Handler with Tracking
  const onSubmit = async (data: ReferralFormData) => {
    trackClarityEvent(ClarityEvents.FORM_SUBMITTED);
    setIsSubmitting(true);
    
    try {
      const response = await submitReferral(data);
      
      if (response.success) {
        trackClarityEvent(ClarityEvents.SUBMISSION_SUCCESS, {
          referral_id: response.recordId,
        });
        trackClarityEvent(ClarityEvents.AIRTABLE_SUCCESS);
        
        setSubmissionResult({ recordId: response.recordId });
        localStorage.removeItem('karbon_referral_draft');
        nextStep();
      }
    } catch (error) {
      console.error("Submission failed", error);
      trackClarityEvent(ClarityEvents.SUBMISSION_FAILED, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      trackClarityEvent(ClarityEvents.AIRTABLE_ERROR);
      alert("Failed to submit referral. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    setSubmissionResult(null);
    setCurrentStep(1);
    localStorage.removeItem('karbon_referral_draft');
    trackClarityEvent('form_reset');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Marketing Banner */}
      <div className="w-full h-[40px] bg-[#1B56FD] flex items-center justify-center">
        <p className="text-sm font-medium text-white tracking-wide transition-opacity duration-500">
          Refer Business. Help Friends. Earn Rewards.
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {currentStep < 4 && (
          <Stepper 
            currentStep={currentStep} 
            steps={['Referrer Info', 'Business Details', 'Terms & Review', 'Complete']} 
          />
        )}

        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 mt-8">
          <div className="p-6 md:p-10">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {currentStep === 1 && (
                  <Step1Referrer onNext={nextStep} />
                )}
                {currentStep === 2 && (
                  <Step2Business onNext={nextStep} onBack={prevStep} />
                )}
                {currentStep === 3 && (
                  <Step3Terms 
                    onBack={prevStep} 
                    onNext={() => {}} 
                    isSubmitting={isSubmitting}
                    onSubmit={methods.handleSubmit(onSubmit)}
                  />
                )}
                {currentStep === 4 && submissionResult && (
                  <Step4Thanks 
                    data={methods.getValues()} 
                    recordId={submissionResult.recordId}
                    onReset={handleReset}
                  />
                )}
              </form>
            </FormProvider>
          </div>
          
          {currentStep < 4 && (
             <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-center">
                <p className="text-xs text-slate-500">
                  Need help? Contact us at{' '}
                  <a href="mailto:sales@karboncard.com" className="text-[#1B56FD] hover:underline font-medium">
                    sales@karboncard.com
                  </a>
                </p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;