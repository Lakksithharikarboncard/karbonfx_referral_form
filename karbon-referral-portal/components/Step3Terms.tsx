import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StepProps } from '../types';
import { ArrowRight, ArrowLeft, FileText } from 'lucide-react';

interface Step3TermsProps extends StepProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

const Step3Terms: React.FC<Step3TermsProps> = ({ onBack, isSubmitting, onSubmit }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#1B56FD]" aria-hidden="true" />
          Referral Program - Terms & Conditions
        </h2>
        <p className="text-slate-500 mt-1">
          Please review and accept the terms below to complete your referral submission.
        </p>
      </div>

      {/* Terms Content - Scrollable */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
        <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
          <p className="text-sm">By submitting this referral form, you agree to the following terms:</p>

          {/* Section 1 */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. Eligibility</h3>
            <ul className="space-y-1 list-disc list-inside text-sm ml-2">
              <li>Only existing Karbon customers can participate.</li>
              <li>You refer someone by submitting their details through this form.</li>
              <li>The referred person ("Referee") must register and complete their first transaction with us.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. Reward Terms</h3>
            <ul className="space-y-1 list-disc list-inside text-sm ml-2">
              <li>First transaction means a completed FX transaction.</li>
              <li>Vouchers will be issued within 30 days of transaction completion.</li>
              <li>Vouchers are subject to the issuer's terms and expiry dates.</li>
              <li>We reserve the right to verify all referrals and disqualify fraudulent/duplicate entries.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. Your Responsibilities</h3>
            <p className="text-sm mb-2">You confirm that:</p>
            <ul className="space-y-1 list-disc list-inside text-sm ml-2">
              <li>The Referee has been informed about this referral and consents to being contacted by us.</li>
              <li>All information provided (yours and the Referee's) is accurate.</li>
              <li>You will not spam, misuse, or engage in fraudulent referral activities.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4. Data & Privacy</h3>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-slate-800">Your email, and phone number to track referrals and issue rewards.</p>
              <div>
                <p className="font-semibold text-slate-800">Referee's email, phone number, company name, and transaction intent to:</p>
                <ul className="space-y-1 list-disc list-inside ml-2 mt-1">
                  <li>Contact them about our services</li>
                  <li>Complete onboarding</li>
                  <li>Issue referral rewards</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Sharing:</p>
                <p className="ml-2">We may share relevant information with our licensed FX partners and service providers strictly for onboarding, transaction processing, KYC compliance, and reward distribution.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Your Rights:</p>
                <p className="ml-2">
                  You or the Referee may withdraw consent or request data deletion by emailing{' '}
                  <a href="mailto:sales@karboncard.com" className="text-[#1B56FD] hover:underline">
                    sales@karboncard.com
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">5. Program Changes</h3>
            <p className="text-sm">
              We may modify, suspend, or terminate this program at any time with reasonable notice. Pending rewards will be honored for qualified referrals made before termination.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">6. General</h3>
            <ul className="space-y-1 list-disc list-inside text-sm ml-2">
              <li>Our decisions on eligibility and rewards are final.</li>
              <li>These terms are governed by Indian law, subject to courts in Bengaluru.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acceptance Checkbox with Justified Text */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className={`mt-1 w-4 h-4 rounded border text-[#1B56FD] focus:ring-[#1B56FD] ${
              errors.acceptedTerms ? 'border-red-500' : 'border-slate-300'
            }`}
            {...register('acceptedTerms')}
          />
          <span className="text-sm text-slate-700 text-justify leading-relaxed">
            I confirm that I have read and agree to these Terms & Conditions, that the Referee is aware of this referral and consents to being contacted by Karbon, and that I consent to Karbon processing and sharing my personal data as described above.
          </span>
        </label>
        {errors.acceptedTerms && (
          <p className="mt-2 ml-7 text-sm text-red-600">{errors.acceptedTerms.message as string}</p>
        )}
      </div>

      {/* Action Buttons - Uniform sizing */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center min-w-[140px] px-6 py-2.5 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B56FD] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center min-w-[140px] px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#1B56FD] hover:bg-[#1547E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B56FD] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Referral
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3Terms;
