import React, { useEffect } from 'react';
import { ReferralFormData } from '../types';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { trackClarityEvent, identifyClarityUser, setClarityTag, ClarityEvents } from '../utils/clarity.ts';

interface Step4ThanksProps {
  data: ReferralFormData;
  recordId: string;
  onReset: () => void;
}

const Step4Thanks: React.FC<Step4ThanksProps> = ({ data, recordId }) => {
  // Clarity tracking and confetti animation on mount
  useEffect(() => {
    // Track thank you page view
    trackClarityEvent(ClarityEvents.THANK_YOU_VIEWED, {
      referral_id: recordId,
      referrer_company: data.referrerCompany,
      referred_company: data.referredCompanyName,
    });
    
    // Identify user session by referral ID
    identifyClarityUser(recordId);
    
    // Set custom tags for filtering in Clarity
    setClarityTag('referral_id', recordId);
    setClarityTag('submission_complete', 'true');
    
    // Create confetti effect
    const duration = 3000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const colors = ['#1B56FD', '#60A5FA', '#3B82F6', '#2563EB', '#1E40AF'];

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 3;

      // Create confetti from left side
      createConfetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });

      // Create confetti from right side
      createConfetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
    }, 50);

    return () => clearInterval(interval);
  }, [recordId, data]);

  // Simple confetti creation function
  function createConfetti(options: any) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    
    for (let i = 0; i < options.particleCount; i++) {
      particles.push({
        x: canvas.width * options.origin.x,
        y: canvas.height * options.origin.y,
        angle: options.angle + (Math.random() - 0.5) * options.spread,
        velocity: 3 + Math.random() * 3,
        color: options.colors[Math.floor(Math.random() * options.colors.length)],
        size: 8 + Math.random() * 4,
        decay: 0.95,
        gravity: 0.3,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let stillActive = false;

      particles.forEach((p) => {
        p.velocity *= p.decay;
        p.y += p.gravity;
        p.x += Math.cos((p.angle * Math.PI) / 180) * p.velocity;
        p.y += Math.sin((p.angle * Math.PI) / 180) * p.velocity;

        if (p.y < canvas.height && p.velocity > 0.1) {
          stillActive = true;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      if (stillActive) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(canvas);
      }
    }

    animate();
  }

  const handleReturnToDashboard = () => {
    // Track dashboard button click
    trackClarityEvent(ClarityEvents.RETURN_TO_DASHBOARD, {
      referral_id: recordId,
      destination: 'https://karbonfx.com/login',
    });
    
    window.location.href = 'https://karbonfx.com/login';
  };

  const handleContactTeam = () => {
    // Track contact team click
    trackClarityEvent('contact_team_clicked', {
      referral_id: recordId,
      source: 'thank_you_page',
    });
  };

  return (
    <div className="animate-fadeIn">
      {/* Success Icon and Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Thank you for your referral!
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We'll send your <span className="font-semibold text-[#1B56FD]">₹2,500 voucher</span> following their first successful transaction.
        </p>
      </div>

      {/* Reference ID */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Reference ID</p>
            <p className="text-lg font-mono font-semibold text-slate-900">{recordId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500 mb-1">Status</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Submitted
            </span>
          </div>
        </div>
      </div>

      {/* Referral Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Referral Summary</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Your Name</p>
              <p className="text-base text-slate-900 mt-1">{data.referrerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Your Company</p>
              <p className="text-base text-slate-900 mt-1">{data.referrerCompany}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Referred Company</p>
              <p className="text-base text-slate-900 mt-1">{data.referredCompanyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Contact Person</p>
              <p className="text-base text-slate-900 mt-1">{data.referredContactName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-base font-semibold text-blue-900 mb-3">What happens next?</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Our team will reach out to the referred business to introduce our services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Once they complete their first transaction, we'll notify you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Your ₹2,500 Amazon voucher will be issued within 30 days of transaction completion</span>
          </li>
        </ul>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleReturnToDashboard}
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#1B56FD] hover:bg-[#1547E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B56FD] transition-all duration-200"
        >
          Return to Dashboard
          <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Support Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          Questions about your referral?{' '}
          <a 
            href="mailto:sales@karboncard.com" 
            className="text-[#1B56FD] hover:underline font-medium"
            onClick={handleContactTeam}
          >
            Contact our team
          </a>
        </p>
      </div>
    </div>
  );
};

export default Step4Thanks;
