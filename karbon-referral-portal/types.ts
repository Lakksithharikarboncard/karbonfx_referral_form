import { z } from 'zod';

// Enums as per PRD
export enum DiscoverySource {
  EMAIL = 'Email',
  KARBON_TEAM = 'Karbon Team',
  WORD_OF_MOUTH = 'Word of Mouth',
  OTHER = 'Other'
}

export enum OnboardingTimeline {
  IMMEDIATE = 'Immediate',
  THIS_MONTH = 'This Month',
  THIS_QUARTER = 'This Quarter',
  NEXT_QUARTER = 'Next Quarter'
}

export enum NotificationStatus {
  YES = 'Yes',
  NO = 'No'
}

// Regex patterns - Updated for 10-digit Indian phone numbers (without +91)
const PHONE_REGEX = /^[6-9]\d{9}$/; // 10 digits starting with 6-9

// Zod Schema with concise error messages
export const referralSchema = z.object({
  // Step 1: Referrer Details
  referrerName: z.string().min(2, "Name is required").max(100),
  referrerEmail: z.string().email("Invalid email"),
  referrerPhone: z.string().regex(PHONE_REGEX, "Invalid phone number"),
  referrerCompany: z.string().min(2, "Company name is required").max(150),

  // Step 2: Referred Business Details
  referredCompanyName: z.string().min(2, "Company name is required").max(150),
  referredContactName: z.string().min(2, "Contact name is required").max(100),
  referredEmail: z.string().email("Invalid email"),
  referredPhone: z.string().regex(PHONE_REGEX, "Invalid phone number"),
  
  // FIXED: Removed .transform() to keep it as string
  transactionValue: z.string()
    .min(1, "Transaction value is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 500;
    }, "Minimum value is $500")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num <= 100000;
    }, "Maximum value is $100,000"),
  
  notificationStatus: z.nativeEnum(NotificationStatus, {
    errorMap: () => ({ message: "Please select an option" })
  }),
  discoverySource: z.nativeEnum(DiscoverySource, {
    errorMap: () => ({ message: "Please select an option" })
  }),
  onboardingTimeline: z.nativeEnum(OnboardingTimeline, {
    errorMap: () => ({ message: "Please select an option" })
  }),

  // Step 3: Terms
  acceptedTerms: z.boolean().refine(val => val === true, "You must accept the terms"),
});

export type ReferralFormData = z.infer<typeof referralSchema>;

// FIXED: Removed 'as any' type assertion
export const defaultValues: Partial<ReferralFormData> = {
  referrerName: '',
  referrerEmail: '',
  referrerPhone: '',
  referrerCompany: '',
  referredCompanyName: '',
  referredContactName: '',
  referredEmail: '',
  referredPhone: '',
  transactionValue: '', // Now correctly typed as string
  acceptedTerms: false,
  notificationStatus: undefined,
  discoverySource: undefined,
  onboardingTimeline: undefined,
};

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}