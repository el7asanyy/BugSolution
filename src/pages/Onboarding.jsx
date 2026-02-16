import React from 'react'; // Added import
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import heroImage from '../assets/onboarding-hero.png';
import { useLanguage } from '../context/LanguageContext'; // Added import

const Onboarding = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // Added hook

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-gradient-to-b from-white to-green-50 p-6 items-center text-center justify-center">
        {/* Hero Image */}
        <div className="mb-8 w-full max-w-[280px]">
          <img 
            src={heroImage} 
            alt="Protect your home and planet" 
            className="w-full h-auto object-contain animate-float"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl font-bold text-black leading-tight whitespace-pre-wrap">
            {t('onboardingTitle')}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed px-2">
            {t('onboardingDesc')}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/register')}
          className="w-full bg-[#C0A94F] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#a89342] transition-colors text-xl"
        >
          {t('registerNow')}
        </button>
      </div>
    </AppLayout>
  );
};

export default Onboarding;
