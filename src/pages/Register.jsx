import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import logo from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext'; // Added import

// Simple Google Icon Component since lucide doesn't have it standard
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// Facebook Icon ... (keep existing)
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);


const Register = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage(); // Added hook
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    // Navigate to OTP
    navigate('/otp');
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-white p-6 justify-center">
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="Re-oil Logo"
            className="w-32 h-auto" // Adjust size as needed, assumed w-32 based on typically logo sizes
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">{t('registerTitle')}</h2>

        {/* Phone Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="tel"
              placeholder={t('phonePlaceholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-right focus:outline-none focus:border-[#C0A94F] focus:ring-1 focus:ring-[#C0A94F] transition-all text-lg"
              dir={dir} // Ensure correct direction
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-[#C0A94F] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#a89342] transition-colors text-xl mb-6"
        >
          {t('registerNow')}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t('continueWith')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <GoogleIcon />
            <span className="font-medium text-gray-700">{t('google')}</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6">
              <FacebookIcon />
            </div>
            <span className="font-medium text-gray-700">{t('facebook')}</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
