import React from 'react';
import { ReferralFormData } from '../types';
import { CheckCircle, Copy, Plus, ExternalLink } from 'lucide-react';

interface Step4Props {
  data: ReferralFormData;
  recordId: string;
  onReset: () => void;
}

const Step4Thanks: React.FC<Step4Props> = ({ data, recordId, onReset }) => {
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(recordId);
    alert('Reference ID copied to clipboard!');
  };

  return (
    <div className="animate-fadeIn text-center">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Thank you for your referral!</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        We have received your submission. Our team will review the details and contact you within 2-3 business days.
      </p>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto shadow-sm text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-100">
            <div>
                <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Submission Reference</p>
                <p className="text-lg font-mono font-bold text-slate-900 mt-1">{recordId}</p>
            </div>
            <button 
                onClick={copyToClipboard}
                className="mt-2 md:mt-0 inline-flex items-center text-sm text-karbon-600 hover:text-karbon-800 font-medium"
            >
                <Copy className="w-4 h-4 mr-1" /> Copy ID
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Referrer</h4>
                <dl className="space-y-1 text-sm text-slate-600">
                    <div className="flex justify-between"><dt className="text-slate-400">Name:</dt> <dd>{data.referrerName}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-400">Company:</dt> <dd>{data.referrerCompany}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-400">Email:</dt> <dd>{data.referrerEmail}</dd></div>
                </dl>
            </div>
            <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Referred Business</h4>
                <dl className="space-y-1 text-sm text-slate-600">
                    <div className="flex justify-between"><dt className="text-slate-400">Company:</dt> <dd>{data.referredCompanyName}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-400">Contact:</dt> <dd>{data.referredContactName}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-400">Est. Value:</dt> <dd>${data.transactionValue?.toLocaleString()}</dd></div>
                </dl>
            </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-karbon-600 hover:bg-karbon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbon-500"
        >
          <Plus className="ml-2 -ml-1 mr-2 h-5 w-5" />
          Submit Another Referral
        </button>
        <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbon-500"
        >
            Return to Dashboard
            <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default Step4Thanks;