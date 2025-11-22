import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center space-x-2 md:space-x-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step} className="flex items-center">
              {/* Line connector for previous steps */}
              {index > 0 && (
                <div className={`hidden md:block h-0.5 w-12 mr-4 ${isCompleted || isCurrent ? 'bg-karbon-500' : 'bg-slate-200'}`} />
              )}
              
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300
                    ${isCompleted 
                      ? 'bg-karbon-500 border-karbon-500 text-white' 
                      : isCurrent
                        ? 'bg-white border-karbon-500 text-karbon-600'
                        : 'bg-white border-slate-200 text-slate-400'
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <span className="text-sm font-semibold">{stepNumber}</span>}
                </div>
                <span 
                  className={`
                    mt-2 text-xs font-medium hidden md:block
                    ${isCurrent ? 'text-karbon-700' : 'text-slate-400'}
                  `}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile Label */}
      <div className="md:hidden text-center mt-4">
        <span className="text-sm font-medium text-slate-600">
          Step {currentStep} of {steps.length}: <span className="text-karbon-700">{steps[currentStep - 1]}</span>
        </span>
      </div>
    </div>
  );
};

export default Stepper;