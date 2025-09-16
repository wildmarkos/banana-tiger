import * as Sentry from '@sentry/nextjs';

export const onRequestError = Sentry.captureRequestError;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Node.js Sentry configuration
    Sentry.init({
      // Sentry DSN
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      // Increase max length for messages to prevent truncation (default is 250)
      maxValueLength: 8192,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge Sentry configuration
    // Note: User context (userId, orgId, orgRole) is set in layouts via setSentryUserContext()
    Sentry.init({
      // Sentry DSN
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      // Increase max length for messages to prevent truncation (default is 250)
      maxValueLength: 8192,
    });
  }
}
