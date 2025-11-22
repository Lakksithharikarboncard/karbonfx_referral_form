/**
 * Airtable API Integration for Karbon FX Referral Program
 * Single-file solution with complete error handling and retry logic
 */

import { ReferralFormData } from '../types';

// ============================================================================
// CONFIGURATION
// ============================================================================

const AIRTABLE_CONFIG = {
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID || '',
  tableId: 'tbll5rRpzlnqjl2l8',
  apiToken: import.meta.env.VITE_AIRTABLE_API_TOKEN || '',
  apiUrl: 'https://api.airtable.com/v0',
};

// ============================================================================
// FIELD MAPPING
// ============================================================================

const FIELD_MAPPING = {
  referrerName: 'Referrer Name',
  referrerEmail: 'Referrer Email',
  referrerPhone: 'Referrer Phone Number',
  referrerCompany: 'Referrer Company',
  referredCompanyName: 'Referred Company Name',
  referredContactName: 'Referred Contact Name',
  referredEmail: 'Referred Official Email',
  referredPhone: 'Referred Phone Number',
  transactionValue: 'Estimated Volume (in ₹)',
  onboardingTimeline: 'Expected Onboarding',
  notificationStatus: 'Have you notified this contact?',
  discoverySource: 'Referral Source',
  acceptedTerms: 'Terms Accepted',
  referralId: 'referral_id',
} as const;

// ============================================================================
// TYPES
// ============================================================================

interface AirtableRecord {
  fields: Record<string, any>;
}

interface AirtableResponse {
  id: string;
  createdTime: string;
  fields: Record<string, any>;
}

interface SubmitResponse {
  success: boolean;
  recordId: string;
  airtableRecordId?: string;
  data?: any;
  error?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate unique referral ID
 * Format: REF-{TIMESTAMP}-{RANDOM}
 * Example: REF-2KX9P1-A7F3M
 */
function generateReferralId(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-6);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `REF-${timestamp}-${random}`;
}

/**
 * Transform form data to Airtable format
 */
function transformToAirtableFormat(data: ReferralFormData): Record<string, any> {
  const referralId = generateReferralId();

  return {
    [FIELD_MAPPING.referrerName]: data.referrerName,
    [FIELD_MAPPING.referrerEmail]: data.referrerEmail,
    [FIELD_MAPPING.referrerPhone]: `+91${data.referrerPhone}`,
    [FIELD_MAPPING.referrerCompany]: data.referrerCompany,
    [FIELD_MAPPING.referredCompanyName]: data.referredCompanyName,
    [FIELD_MAPPING.referredContactName]: data.referredContactName,
    [FIELD_MAPPING.referredEmail]: data.referredEmail,
    [FIELD_MAPPING.referredPhone]: `+91${data.referredPhone}`,
    [FIELD_MAPPING.transactionValue]: data.transactionValue.toString(),
    [FIELD_MAPPING.onboardingTimeline]: data.onboardingTimeline,
    [FIELD_MAPPING.notificationStatus]: data.notificationStatus,
    [FIELD_MAPPING.discoverySource]: data.discoverySource,
    [FIELD_MAPPING.acceptedTerms]: data.acceptedTerms ? 'true' : 'false',
    [FIELD_MAPPING.referralId]: referralId,
  };
}

/**
 * Retry logic for API calls
 */
async function retryAsync<T>(
  fn: () => Promise<T>,
  options = { retries: 3, delay: 1000 }
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < options.retries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, options.delay * (i + 1)));
      }
    }
  }

  throw lastError!;
}

/**
 * Validate environment configuration
 */
function validateConfig(): void {
  if (!AIRTABLE_CONFIG.baseId) {
    throw new Error('Airtable Base ID is not configured. Please set VITE_AIRTABLE_BASE_ID in your .env file.');
  }
  if (!AIRTABLE_CONFIG.apiToken) {
    throw new Error('Airtable API Token is not configured. Please set VITE_AIRTABLE_API_TOKEN in your .env file.');
  }
}

// ============================================================================
// MAIN API FUNCTION
// ============================================================================

/**
 * Submit referral to Airtable
 * @param data - Form data from React Hook Form
 * @returns Response with success status and record ID
 */
export async function submitReferral(data: ReferralFormData): Promise<SubmitResponse> {
  try {
    // Validate configuration
    validateConfig();

    // Transform data to Airtable format
    const airtableData = transformToAirtableFormat(data);
    const referralId = airtableData[FIELD_MAPPING.referralId];

    console.log('Submitting to Airtable:', {
      referralId,
      company: data.referredCompanyName,
    });

    // Construct API endpoint
    const endpoint = `${AIRTABLE_CONFIG.apiUrl}/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tableId}`;

    // Make API call with retry logic
    const response = await retryAsync(
      async () => {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_CONFIG.apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: airtableData,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error?.message || 
            `Airtable API error: ${res.status} ${res.statusText}`
          );
        }

        return res.json();
      },
      { retries: 3, delay: 1000 }
    );

    const airtableRecord = response as AirtableResponse;

    console.log('Airtable submission successful:', {
      airtableRecordId: airtableRecord.id,
      referralId,
    });

    return {
      success: true,
      recordId: referralId,
      airtableRecordId: airtableRecord.id,
      data: airtableRecord.fields,
    };

  } catch (error) {
    console.error('Airtable submission error:', error);

    // User-friendly error messages
    let errorMessage = 'Failed to submit referral. Please try again.';

    if (error instanceof Error) {
      if (error.message.includes('not configured')) {
        errorMessage = 'System configuration error. Please contact support.';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'Authentication error. Please contact support.';
      }
    }

    return {
      success: false,
      recordId: '',
      error: errorMessage,
    };
  }
}

// ============================================================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if Airtable is properly configured
 */
export function isAirtableConfigured(): boolean {
  return !!(AIRTABLE_CONFIG.baseId && AIRTABLE_CONFIG.apiToken);
}

/**
 * Get Airtable configuration status (for debugging)
 */
export function getConfigStatus() {
  return {
    baseIdConfigured: !!AIRTABLE_CONFIG.baseId,
    apiTokenConfigured: !!AIRTABLE_CONFIG.apiToken,
    tableId: AIRTABLE_CONFIG.tableId,
  };
}
