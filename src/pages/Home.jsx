import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import BottomNavigation from '../components/layout/BottomNavigation';
import { Bell, TrendingUp, Flame, Gift, Droplets, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { t, dir } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
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
                    className="bg-white p-6 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md bg-white/80"
                >
                    <div className="flex items-center gap-2">
                        <motion.span 
                            animate={{ rotate: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            className="text-2xl"
                        >
                            👋
                        </motion.span>
                        <h1 className="text-lg font-bold text-gray-800">{t('welcome')}</h1>
                    </div>
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#FEF9E6] p-2 rounded-full relative cursor-pointer"
                    >
                        <Bell size={20} className="text-[#C0A94F]" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </motion.div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-4 space-y-5"
                >
                    {/* Promotional Banner */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-[2rem] p-6 text-white relative overflow-hidden"
                    >
                         <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                         <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
                         <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-2 leading-tight">{t('bannerTitle')}</h2>
                            <p className="text-white/90 text-sm font-medium">{t('bannerDesc')}</p>
                            <motion.div 
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mt-4 inline-flex items-center text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm"
                            >
                                {t('moreInfo')} →
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Price Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white rounded-[2rem] p-6 border border-gray-100 relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-gray-500 font-bold text-sm mb-2 uppercase tracking-wider">{t('oilPriceTitle')}</h2>
                                <div className="flex items-baseline gap-2" dir={dir}>
                                    <motion.span 
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: 'spring' }}
                                        className="text-6xl font-black text-[#C0A94F] drop-shadow-sm"
                                    >
                                        30
                                    </motion.span>
                                    <span className="text-gray-400 font-bold text-lg">{t('currency')}</span>
                                </div>
                            </div>
                            <motion.div 
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="bg-[#FEF9E6] p-4 rounded-2xl shadow-inner"
                            >
                                <TrendingUp size={28} className="text-[#C0A94F]" />
                            </motion.div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-[#8B7500] font-bold bg-[#FEF9E6]/50 p-2 rounded-xl mb-4">
                            <TrendingUp size={16} />
                            <span>{t('dailyUpdate')}</span>
                        </div>
                        
                        <div className="border-t border-gray-50 pt-4">
                            <p className="text-[11px] text-gray-400 text-center font-medium italic opacity-80">{t('updateNote')}</p>
                        </div>
                        
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C0A94F]/5 rounded-full blur-3xl group-hover:bg-[#C0A94F]/10 transition-colors" />
                    </motion.div>

                    {/* Quick Sell Action */}
                    <motion.button 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/sell')}
                        className="w-full bg-gradient-to-r from-[#C0A94F] to-[#8B7500] text-white p-5 rounded-2xl shadow-lg flex items-center justify-center gap-4 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                        <ShoppingBag size={26} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-xl font-black tracking-wide">{t('sellOilNow')}</span>
                    </motion.button>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -3 }}
                            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center justify-center gap-2 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#FFF4E6] flex items-center justify-center mb-1 shadow-inner group">
                                <Flame size={28} className="text-orange-500 group-hover:scale-110 transition-transform" fill="#F97316" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{t('totalSales')}</span>
                            <span className="text-2xl font-black text-gray-800">45 <small className="text-sm font-bold text-gray-400">{t('liter')}</small></span>
                        </motion.div>
                        
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -3 }}
                            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center justify-center gap-2 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#FEF9E6] flex items-center justify-center mb-1 shadow-inner group">
                                <Gift size={28} className="text-[#C0A94F] group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{t('rewardPoints')}</span>
                            <span className="text-2xl font-black text-gray-800">230 <small className="text-sm font-bold text-gray-400">{t('point')}</small></span>
                        </motion.div>
                    </div>

                    {/* Environmental Impact */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-br from-[#00BFA5] to-[#00897B] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden"
                    >
                         <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                         <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
                         
                         <div className="relative z-10 flex flex-col items-center text-center">
                             <motion.div 
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/30"
                             >
                                <Droplets size={32} className="text-white" />
                             </motion.div>
                             <h3 className="font-black text-xl mb-3 tracking-wide">{t('environmentalImpact')}</h3>
                             <p className="text-white/90 text-sm leading-relaxed max-w-[240px] font-medium">
                                {t('impactDesc')}
                             </p>
                         </div>
                    </motion.div>
                </motion.div>
            </div>
            <BottomNavigation />
        </AppLayout>
    );
};

export default HomePage;

