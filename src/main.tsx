import { StateMachineProvider } from 'little-state-machine';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StateMachineProvider>
      <App />
    </StateMachineProvider>
  </React.StrictMode>,
);
