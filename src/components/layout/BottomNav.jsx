import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Award, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center py-3 pb-5 z-[50] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center gap-1 ${isActive('/home') ? 'text-[#C0A94F]' : 'text-gray-400'}`}
      >
        <div className={`p-1 rounded-xl ${isActive('/home') ? 'bg-[#FEF9E6]' : ''}`}>
             <Home size={24} fill={isActive('/home') ? "#C0A94F" : "none"} />
        </div>
        <span className="text-[10px] font-medium">{t('navHome')}</span>
      </button>

      <button 
        onClick={() => navigate('/sell')}
        className={`flex flex-col items-center gap-1 ${isActive('/sell') ? 'text-[#C0A94F]' : 'text-gray-400'}`}
      >
        <div className={`p-1 rounded-xl ${isActive('/sell') ? 'bg-[#FEF9E6]' : ''}`}>
            <ShoppingBag size={24} fill={isActive('/sell') ? "#C0A94F" : "none"} />
        </div>
        <span className="text-[10px] font-medium">{t('navSell')}</span>
      </button>

      <button 
         onClick={() => navigate('/points')}
         className={`flex flex-col items-center gap-1 ${isActive('/points') ? 'text-[#C0A94F]' : 'text-gray-400'}`}
      >
         <div className={`p-1 rounded-xl ${isActive('/points') ? 'bg-[#FEF9E6]' : ''}`}>
             <Award size={24} />
         </div>
        <span className="text-[10px] font-medium">{t('navPoints')}</span>
      </button>

      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-[#C0A94F]' : 'text-gray-400'}`}
      >
        <div className={`p-1 rounded-xl ${isActive('/profile') ? 'bg-[#FEF9E6]' : ''}`}>
             <User size={24} fill={isActive('/profile') ? "#C0A94F" : "none"} />
        </div>
        <span className="text-[10px] font-medium">{t('navProfile')}</span>
      </button>
    </div>
  );
};

export default BottomNav;
