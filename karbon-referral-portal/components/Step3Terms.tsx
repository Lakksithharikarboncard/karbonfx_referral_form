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
        <div className="prose prose-sm max-w-none text-slate-700 space-y-5">
          <p className="text-sm text-justify leading-relaxed">
            By submitting this referral form, you agree to the following terms:
          </p>

          {/* Section 1: Eligibility */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 mb-3">1. Eligibility</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>Only existing Karbon customers with an active account can participate.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>You ("Referrer") refer someone by submitting their details through this form.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>The referred person ("Referee") must register with us and complete their first eligible transaction.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>Upon completion of the Referee's first eligible transaction, both the Referrer and the Referee will receive a <span className="font-semibold text-slate-900">₹2,500 reward voucher</span>, issued through either Amazon or Xoxoday, based on the individual preference communicated by each party.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Reward Terms */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 mb-3">2. Reward Terms</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>First transaction means a completed FX transaction with a <span className="font-semibold text-slate-900">minimum transaction value of ₹500</span>.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>Vouchers will be issued within 30 days of transaction completion.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>Vouchers are subject to the issuer's terms and expiry dates.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>We reserve the right to verify all referrals and disqualify fraudulent or duplicate entries.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>Amazon vouchers can be tracked by default for redemption status. We may verify whether a voucher has been redeemed before processing any related queries.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Your Responsibilities */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 mb-3">3. Your Responsibilities</h3>
            <p className="text-sm text-justify leading-relaxed mb-2">You confirm that:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>The Referee has been informed about this referral and consents to being contacted by us.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>All information provided (yours and the Referee's) is accurate.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>You will not spam, misuse, or engage in fraudulent referral activities.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>You understand and acknowledge that voucher redemptions are tracked by the issuer, and claims of non-receipt or non-redemption will be reviewed based on issuer validation.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Data & Privacy */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 mb-3">4. Data & Privacy</h3>
            
            <div className="text-sm space-y-2">
              <p className="text-justify leading-relaxed">
                <span className="font-semibold text-slate-900">Your Data:</span> We will use your name, email, and phone number to track referrals and issue rewards.
              </p>
              
              <div className="space-y-1.5">
                <p className="font-semibold text-slate-900">Referee's Data:</p>
                <p className="text-justify leading-relaxed ml-4">
                  We will collect the Referee's name, email, phone number, company name, and transaction intent to:
                </p>
                <ul className="space-y-1.5 ml-8">
                  <li className="flex gap-2 text-justify leading-relaxed">
                    <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                    <span>Contact them about our services</span>
                  </li>
                  <li className="flex gap-2 text-justify leading-relaxed">
                    <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                    <span>Complete onboarding</span>
                  </li>
                  <li className="flex gap-2 text-justify leading-relaxed">
                    <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                    <span>Issue referral rewards</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-1.5">
                <p className="font-semibold text-slate-900">Sharing:</p>
                <p className="text-justify leading-relaxed ml-4">
                  We may share relevant information with our licensed FX partners and service providers strictly for onboarding, transaction processing, KYC compliance, and reward distribution.
                </p>
              </div>
              
              <div className="space-y-1.5">
                <p className="font-semibold text-slate-900">Your Rights:</p>
                <p className="text-justify leading-relaxed ml-4">
                  You or the Referee may withdraw consent or request data deletion by emailing{' '}
                  <a href="mailto:sales@karboncard.com" className="text-[#1B56FD] hover:underline font-medium">
                    sales@karboncard.com
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Program Changes */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 mb-3">5. Program Changes</h3>
            <p className="text-sm text-justify leading-relaxed">
              We may modify, suspend, or terminate this program at any time with reasonable notice. Pending rewards will be honored for qualified referrals made before termination.
            </p>
          </div>

          {/* Section 6: General */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 mb-3">6. General</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>Our decisions on eligibility and rewards are final.</span>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>The Referee must be a distinct legal entity that has never previously held an account with Karbon.</span>
              </li>
              <li className="flex gap-2 leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <div className="space-y-1.5">
                  <p className="text-justify">
                    <span className="font-semibold text-slate-900">Notification:</span> You will receive notifications at two stages of the referral process:
                  </p>
                  <ul className="space-y-1.5 ml-4">
                    <li className="flex gap-2 text-justify leading-relaxed">
                      <span className="text-slate-400">○</span>
                      <span>When the referral form is submitted, and</span>
                    </li>
                    <li className="flex gap-2 text-justify leading-relaxed">
                      <span className="text-slate-400">○</span>
                      <span>When the Referee completes their first qualifying transaction and the reward is ready for issuance.</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-2 text-justify leading-relaxed">
                <span className="text-[#1B56FD] font-bold mt-0.5">•</span>
                <span>These terms are governed by Indian law, subject to the jurisdiction of courts in Bengaluru.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acceptance Checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className={`mt-1 w-4 h-4 flex-shrink-0 rounded border text-[#1B56FD] focus:ring-[#1B56FD] cursor-pointer ${
              errors.acceptedTerms ? 'border-red-500' : 'border-slate-300'
            }`}
            {...register('acceptedTerms')}
          />
          <span className="text-sm text-slate-700 leading-relaxed text-justify group-hover:text-slate-900 transition-colors">
            I confirm that I have read and agree to these Terms & Conditions, that the Referee is aware of this referral and consents to being contacted by Karbon, and that I consent to Karbon processing and sharing my personal data as described above.
          </span>
        </label>
        {errors.acceptedTerms && (
          <p className="mt-2 ml-7 text-sm text-red-600 flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
            {errors.acceptedTerms.message as string}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between gap-4">
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
