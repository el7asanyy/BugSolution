import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import BottomNavigation from '../components/layout/BottomNavigation';
import { ArrowRight, Trophy, TrendingUp, Gift, ChevronRight, Share2, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PointsPage = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const isRtl = dir === 'rtl';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-gray-50 pb-24 overflow-y-auto custom-scrollbar" dir={dir}>
        {/* Header */}
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-md p-4 flex items-center justify-between shadow-sm sticky top-0 z-20"
        >
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)} 
                className="p-2 bg-[#FEF9E6] rounded-xl shadow-sm"
            >
                <ArrowRight size={20} className={`text-[#C0A94F] ${!isRtl && 'rotate-180'}`} />
            </motion.button>
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">{t('pointsTitle')}</h2>
                <p className="text-xs text-gray-400 font-medium">{t('pointsSubtitle')}</p>
            </div>
            <div className="w-10"></div>
        </motion.div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 space-y-6"
        >
            {/* Weekly Offer Banner */}
            <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-[#FFF4E6] to-[#FFE8CC] rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden border border-orange-100 shadow-sm"
            >
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 bg-white/60 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-sm backdrop-blur-sm"
                >
                    <FlameIcon />
                </motion.div>
                <div className="flex-1 z-10">
                    <h3 className="font-bold text-orange-700 text-lg leading-tight">{t('weeklyOffer')}</h3>
                    <p className="text-sm text-gray-700 font-medium">{t('offerDesc')}</p>
                    <p className="text-[10px] text-orange-600/70 mt-1 font-bold uppercase tracking-wider">{t('validUntil')}</p>
                </div>
                <div className={`absolute -bottom-8 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl ${isRtl ? '-left-8' : '-right-8'}`}></div>
            </motion.div>

            {/* Level & Progress */}
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50"
            >
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 block">{t('level')}</span>
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                <Trophy size={28} className="text-gray-300 drop-shadow-sm" />
                            </motion.div>
                            <h2 className="text-3xl font-black text-gray-700">Silver</h2>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden mb-3 p-1 shadow-inner">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 h-full rounded-full relative"
                    >
                        <div className="absolute inset-0 animate-shimmer opacity-30"></div>
                    </motion.div>
                </div>
                <p className={`text-xs text-gray-400 font-bold ${isRtl ? 'text-left' : 'text-right'}`}>{t('toGold')}</p>
            </motion.div>

            {/* Points Balance */}
            <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#C0A94F] via-[#E5C973] to-[#A68A3D] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 text-center">
                    <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">{t('currentBalance')}</p>
                    <motion.h1 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl font-black mb-3 drop-shadow-md"
                    >
                        320
                    </motion.h1>
                    <div className="inline-flex items-center bg-white/20 px-4 py-1.5 rounded-full text-xs font-black backdrop-blur-md border border-white/20">
                        <span>{t('goal')}</span>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-center text-sm border-t border-white/20 pt-5">
                        <span className="font-bold">{t('soon')} <span className="bg-white text-[#8B7500] px-2 py-0.5 rounded-lg text-lg">180</span> {t('forGift')}</span>
                        <motion.div
                            animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Gift size={24} className="text-white drop-shadow-sm" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* History */}
             <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="font-black text-gray-800 tracking-tight">{t('history')}</h3>
                    <motion.button 
                        whileHover={{ x: isRtl ? -5 : 5, color: '#8B7500' }}
                        onClick={() => navigate('/history')}
                        className="text-sm font-black text-[#C0A94F] flex items-center gap-1"
                    >
                        {t('showMore')}
                        <ChevronRight size={16} className={!isRtl && 'rotate-180'} />
                    </motion.button>
                </div>
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
                    <HistoryItem 
                        icon={<TrendingUp size={20} className="text-green-600" />}
                        bg="bg-green-50"
                        title={t('sold10L')}
                        date="20 Oct, 10:30 AM"
                        points="+50"
                        isPositive
                        dir={dir}
                    />
                    <div className="border-t border-gray-50/50 mx-4"></div>
                    <HistoryItem 
                        icon={<Share2 size={20} className="text-blue-600" />}
                        bg="bg-blue-50"
                        title={t('referral')}
                        date="18 Oct, 2:15 PM"
                        points="+10"
                        isPositive
                        dir={dir}
                    />
                    <div className="border-t border-gray-50/50 mx-4"></div>
                    <HistoryItem 
                        icon={<TrendingUp size={20} className="text-green-600" />}
                        bg="bg-green-50"
                        title={t('sold8L')}
                        date="15 Oct, 9:00 AM"
                        points="+40"
                        isPositive
                        dir={dir}
                    />
                </div>
            </motion.div>

            {/* Redeem Section */}
             <motion.div variants={itemVariants}>
                 <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled 
                    className="w-full bg-gray-100 text-gray-400 font-black py-5 rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed opacity-60"
                 >
                     <Gift size={22} />
                     <span>{t('redeemPoints')}</span>
                 </motion.button>
                 <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                     {t('redeemNote')}
                 </p>
            </motion.div>

             {/* Education / How to earn */}
            <motion.div 
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-[#FEF9E6] rounded-3xl p-6 border border-[#F3E5B0] shadow-sm relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h4 className="font-black text-[#8B7500] text-lg mb-3 tracking-tight">{t('howToEarn')}</h4>
                    <ul className="space-y-3 text-sm text-[#8B7500]/80 font-bold">
                        <li className="flex items-center gap-3 bg-white/40 p-2 rounded-xl">
                            <div className="w-2 h-2 rounded-full bg-[#C0A94F]"></div>
                            {t('earnSell')}
                        </li>
                        <li className="flex items-center gap-3 bg-white/40 p-2 rounded-xl">
                             <div className="w-2 h-2 rounded-full bg-[#C0A94F]"></div>
                            {t('earnReferral')}
                        </li>
                    </ul>
                </div>
                <Award size={60} className="absolute -bottom-4 -right-4 text-[#C0A94F]/10 rotate-12" />
            </motion.div>

        </motion.div>
      </div>
      <BottomNavigation />
    </AppLayout>
  );
};

const HistoryItem = ({ icon, bg, title, date, points, isPositive, dir }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
        <div className="flex items-center gap-3">
             <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center`}>
                 {icon}
             </div>
             <div>
                 <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                 <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={10} />
                    <span dir="ltr">{date}</span>
                 </div>
             </div>
        </div>
        <div className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
             {points}
        </div>
    </div>
);

const FlameIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.3.9.5 1.8.5 2.8z"/>
    </svg>
);

export default PointsPage;
