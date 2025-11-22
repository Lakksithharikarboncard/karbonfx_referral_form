/**
 * Microsoft Clarity Helper Functions
 * Provides type-safe methods to track custom events and user actions
 */

declare global {
  interface Window {
    clarity?: (action: string, ...args: any[]) => void;
  }
}

/**
 * Check if Clarity is loaded
 */
export const isClarityLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
};

/**
 * Track custom Clarity event
 */
export const trackClarityEvent = (eventName: string, metadata?: Record<string, any>): void => {
  if (isClarityLoaded()) {
    window.clarity!('event', eventName);
    if (metadata) {
      console.log(`[Clarity] Event: ${eventName}`, metadata);
    }
  }
};

/**
 * Set custom session tag
 */
export const setClarityTag = (key: string, value: string): void => {
  if (isClarityLoaded()) {
    window.clarity!('set', key, value);
  }
};

/**
 * Identify user session (use referral ID)
 */
export const identifyClarityUser = (userId: string): void => {
  if (isClarityLoaded()) {
    window.clarity!('identify', userId);
  }
};

// Event names for consistent tracking
export const ClarityEvents = {
  // Page navigation
  PAGE_LOAD: 'page_load',
  STEP_VIEWED: 'step_viewed',
  
  // Form interactions
  FORM_STARTED: 'form_started',
  STEP_COMPLETED: 'step_completed',
  FORM_SUBMITTED: 'form_submitted',
  FORM_ERROR: 'form_error',
  
  // Field interactions
  FIELD_FOCUSED: 'field_focused',
  FIELD_COMPLETED: 'field_completed',
  
  // Navigation
  NEXT_CLICKED: 'next_clicked',
  BACK_CLICKED: 'back_clicked',
  
  // Submission
  SUBMISSION_SUCCESS: 'submission_success',
  SUBMISSION_FAILED: 'submission_failed',
  AIRTABLE_SUCCESS: 'airtable_success',
  AIRTABLE_ERROR: 'airtable_error',
  
  // Thank you page
  THANK_YOU_VIEWED: 'thank_you_viewed',
  RETURN_TO_DASHBOARD: 'return_to_dashboard_clicked',
};