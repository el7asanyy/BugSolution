import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import BottomNavigation from '../components/layout/BottomNavigation';
import { Bell, TrendingUp, Flame, Gift, Droplets, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const banners = [
    // تقدر تبدّل الـ backgroundImage هنا بصور حقيقية بعدين
    { id: 1, title: 'banner-1' },
    { id: 2, title: 'banner-2' },
    { id: 3, title: 'banner-3' }
];

const BannerCarousel = ({ dir }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className="rounded-[2rem] bg-white overflow-hidden shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Slide area */}
            <div className="relative h-40 bg-gray-100">
                {banners.map((banner, index) => (
                    <motion.div
                        key={banner.id}
                        animate={{ opacity: index === activeIndex ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className={`absolute inset-0 ${index === activeIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    >
                        {/* Placeholder checkered background – استبدله بصورة حقيقية بعدين */}
                        <div className="w-full h-full bg-[linear-gradient(135deg,#f5f5f5_25%,transparent_25%,transparent_50%,#f5f5f5_50%,#f5f5f5_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
                    </motion.div>
                ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 py-3 bg-white" dir={dir}>
                {banners.map((banner, index) => (
                    <button
                        key={banner.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === activeIndex
                                ? 'w-5 bg-[#C0A94F]'
                                : 'w-2 bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

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
                    {/* Banner Slider (placeholder images – you can plug real ones later) */}
                    <BannerCarousel dir={dir} />

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

                    {/* Environmental Impact section styled like the design */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        className="bg-[#00BFA5] rounded-3xl px-6 py-7 text-white shadow-lg flex flex-col items-center text-center"
                    >
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.05, 1],
                                opacity: [0.9, 1, 0.9]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4"
                        >
                            <Droplets size={28} className="text-[#00BFA5]" />
                        </motion.div>
                        <h3 className="font-bold text-base mb-2">
                            {t('environmentalImpact')}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed max-w-xs">
                            {t('impactDesc')}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <BottomNavigation />
        </AppLayout>
    );
};

export default HomePage;

