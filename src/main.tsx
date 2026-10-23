import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

// Placeholder App component - replace with your actual app
function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A192F] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Zestora E-commerce</h1>
        <p className="text-lg text-gray-600">Welcome to Zestora Smart Online Shopping</p>
        <p className="text-sm text-gray-500 mt-4">Vercel Web Analytics is now configured!</p>
      </div>
      <Analytics />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
