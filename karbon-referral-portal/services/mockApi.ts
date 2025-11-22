import { ReferralFormData } from '../types';

export const submitReferral = async (data: ReferralFormData) => {
  // Add +91 prefix to phone numbers before sending to actual backend
  const formattedData = {
    ...data,
    referrerPhone: `+91${data.referrerPhone}`,
    referredPhone: `+91${data.referredPhone}`,
  };

  // Simulate API call
  return new Promise<{ success: boolean; recordId: string }>((resolve) => {
    setTimeout(() => {
      console.log('Submitting referral with formatted data:', formattedData);
      resolve({
        success: true,
        recordId: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
    }, 1500);
  });
};
