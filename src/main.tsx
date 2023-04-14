import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import './index.css';

const VITE_SENTRY = import.meta.env.VITE_SENTRY;
if (VITE_SENTRY) {
  const VITE_SENTRY_TRACESSAMPLERATE = Number(
    import.meta.env.VITE_SENTRY_TRACESSAMPLERATE || '0.1',
  );
  const VITE_SENTRY_REPLAYSSESSIONSAMPLERATE = Number(
    import.meta.env.VITE_SENTRY_TRACESSAMPLERATE || '0.1',
  );
  const VITE_SENTRY_REPLAYSONERRORSAMPLERATE = Number(
    import.meta.env.VITE_SENTRY_REPLAYSONERRORSAMPLERATE || '1.0',
  );
  Sentry.init({
    dsn: VITE_SENTRY,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    // Performance Monitoring
    tracesSampleRate: VITE_SENTRY_TRACESSAMPLERATE, // 1.0 Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: VITE_SENTRY_REPLAYSSESSIONSAMPLERATE, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: VITE_SENTRY_REPLAYSONERRORSAMPLERATE, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
