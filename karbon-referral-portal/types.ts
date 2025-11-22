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

// Regex patterns
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/; // Basic E.164-ish check

// Zod Schema
export const referralSchema = z.object({
  // Step 1: Referrer Details
  referrerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  referrerEmail: z.string().email("Invalid email format"),
  referrerPhone: z.string().regex(PHONE_REGEX, "Please enter a valid phone number (e.g., +15551234567)"),
  referrerCompany: z.string().min(2, "Company name must be at least 2 characters").max(150),

  // Step 2: Referred Business Details
  referredCompanyName: z.string().min(2, "Company name must be at least 2 characters").max(150),
  referredContactName: z.string().min(2, "Contact name must be at least 2 characters").max(100),
  referredEmail: z.string().email("Invalid email format"),
  referredPhone: z.string().regex(PHONE_REGEX, "Please enter a valid phone number"),
  transactionValue: z.number({ invalid_type_error: "Must be a number" }).positive("Must be a positive value"),
  notificationStatus: z.nativeEnum(NotificationStatus, { errorMap: () => ({ message: "Please select an option" }) }),
  discoverySource: z.nativeEnum(DiscoverySource, { errorMap: () => ({ message: "Please select an option" }) }),
  onboardingTimeline: z.nativeEnum(OnboardingTimeline, { errorMap: () => ({ message: "Please select an option" }) }),

  // Step 3: Terms
  acceptedTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

export type ReferralFormData = z.infer<typeof referralSchema>;

export const defaultValues: Partial<ReferralFormData> = {
  transactionValue: undefined,
  acceptedTerms: false,
  notificationStatus: undefined,
  discoverySource: undefined,
  onboardingTimeline: undefined,
};

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}