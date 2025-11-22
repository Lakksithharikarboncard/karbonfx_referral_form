import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReferralFormData, referralSchema, defaultValues } from './types';
import { submitReferral } from './services/mockApi';
import Stepper from './components/Stepper';
import Step1Referrer from './components/Step1Referrer';
import Step2Business from './components/Step2Business';
import Step3Terms from './components/Step3Terms';
import Step4Thanks from './components/Step4Thanks';
import { Send } from 'lucide-react';

function App() {
  // Steps: 1=Referrer, 2=Business, 3=Terms, 4=Success
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ recordId: string } | null>(null);

  // Setup React Hook Form with Zod
  const methods = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues,
    mode: 'onChange' 
  });

  // --- Persistence Logic (localStorage) ---
  useEffect(() => {
    const savedData = localStorage.getItem('karbon_referral_draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        methods.reset(parsed);
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch for changes to save draft
  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem('karbon_referral_draft', JSON.stringify(value));
    }) as any;
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  // --- Navigation Handlers ---
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // --- Submission Handler ---
  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true);
    try {
      const response = await submitReferral(data);
      if (response.success) {
        setSubmissionResult({ recordId: response.recordId });
        // Clear local storage draft
        localStorage.removeItem('karbon_referral_draft');
        nextStep(); // Move to Step 4
      }
    } catch (error) {
      console.error("Submission failed", error);
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
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10" />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Progress Stepper (Only show if not on success page) */}
        {currentStep < 4 && (
          <Stepper 
            currentStep={currentStep} 
            steps={['Referrer Info', 'Business Details', 'Terms & Review', 'Complete']} 
          />
        )}

        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-100 mt-8">
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
                    onNext={() => {}} // Handled by internal submit
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
          
          {/* Footer Support Link */}
          {currentStep < 4 && (
             <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-center">
                <p className="text-xs text-slate-500">
                  Need help? Contact our <a href="#" className="text-karbon-600 hover:underline font-medium">Partnership Team</a>.
                </p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;