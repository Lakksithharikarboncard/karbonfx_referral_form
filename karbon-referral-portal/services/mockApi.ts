import { ReferralFormData } from '../types';

export interface SubmissionResponse {
  success: boolean;
  recordId: string;
  submittedAt: string;
}

/**
 * Simulates the Airtable submission process described in the PRD.
 * In a real app, this would be a POST request to /api/referral/submit
 */
export const submitReferral = async (data: ReferralFormData): Promise<SubmissionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a successful submission with a unique ID
      const randomId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      
      resolve({
        success: true,
        recordId: `REF-${dateStr}-${randomId}`,
        submittedAt: new Date().toISOString(),
      });
    }, 1500); // 1.5s simulated network delay
  });
};