import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import BottomNavigation from '../components/layout/BottomNavigation';
import {
    User,
    Settings,
    ChevronRight,
    ChevronLeft,
    Shield,
    HelpCircle,
    LogOut,
    Camera,
    Globe,
    Moon,
    Bell,
    FileText,
    Award,
    ClipboardList,
    ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { t, dir, language, toggleLanguage } = useLanguage();
    const isRtl = dir === 'rtl';

    // Mock states for toggles
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-gray-100 pb-24 overflow-y-auto custom-scrollbar" dir={dir}>
                {/* 1. Header */}
                <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <div className="w-10"></div> {/* Spacer for centering */}
                    <h1 className="text-xl font-bold text-gray-800">{t('profileTitle')}</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-[#FEF9E6] rounded-full flex items-center justify-center text-[#8B7500] hover:bg-[#FDE68A] transition-colors"
                    >
                        {isRtl ? <ArrowRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-4 space-y-4"
                >
                    {/* 2. User Profile Card */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl p-5 shadow-sm">
                        <div className="flex items-start justify-between mb-6">
                            {/* Left: Edit Icon */}
                            <button className="w-10 h-10 bg-[#FEF9E6] rounded-full flex items-center justify-center text-[#C0A94F]">
                                <FileText size={18} />
                            </button>

                            {/* Center: Info */}
                            <div className="flex flex-col items-center text-center">
                                <h2 className="text-xl font-bold text-gray-800 mb-1">{t('userName')}</h2>
                                <p className="text-gray-500 text-sm mb-2">0100xxxxxxx</p>
                                <div className="flex items-center gap-3 text-xs font-bold text-[#C0A94F]">
                                    <span className="flex items-center gap-1">
                                        <Award size={12} /> 320 {t('point')}
                                    </span>
                                    <span>•</span>
                                    <span>45 {t('liter')}</span>
                                </div>
                            </div>

                            {/* Right: Avatar */}
                            <div className="relative">
                                <div className="w-20 h-20 bg-[#C0A94F] rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-sm overflow-hidden">
                                    <User size={40} />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-[#FCD34D] p-1.5 rounded-full border-2 border-white text-white">
                                    <Camera size={12} />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => navigate('/history')}
                                className="bg-[#A7F3D0] h-24 rounded-2xl flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <ClipboardList size={28} className="text-[#065F46]" />
                                <span className="font-bold text-[#065F46]">{t('orderHistory')}</span>
                            </button>
                            <button
                                onClick={() => navigate('/points')}
                                className="bg-[#FCD34D] h-24 rounded-2xl flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <Award size={28} className="text-[#92400E]" />
                                <span className="font-bold text-[#92400E]">{t('pointsTitle')}</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* 3. Settings Section */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl p-5 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">{t('settings')}</h3>
                        <div className="space-y-1">
                            {/* Language */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#FEF9E6] rounded-full flex items-center justify-center text-[#C0A94F]">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{t('language')}</p>
                                        <p className="text-xs text-gray-500">{t('languageName')}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleLanguage}
                                    className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-3 py-1.5 rounded-full"
                                >
                                    {language === 'ar' ? 'EN' : 'عربي'}
                                </button>
                            </div>

                            {/* Dark Mode */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#FEF9E6] rounded-full flex items-center justify-center text-[#C0A94F]">
                                        <Moon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{t('darkMode')}</p>
                                        <p className="text-xs text-gray-500">{t('disabled')}</p>
                                    </div>
                                </div>
                                <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            </div>

                            {/* Notifications */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#FEF9E6] rounded-full flex items-center justify-center text-[#C0A94F]">
                                        <Bell size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{t('notifications')}</p>
                                        <p className="text-xs text-gray-500">{t('disabled')}</p>
                                    </div>
                                </div>
                                <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
                            </div>

                            {/* Privacy */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#FEF9E6] rounded-full flex items-center justify-center text-[#C0A94F]">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{t('privacy')}</p>
                                        <p className="text-xs text-gray-500">{t('privacyDesc')}</p>
                                    </div>
                                </div>
                                <ChevronLeft size={18} className={`text-gray-400 ${isRtl ? '' : 'rotate-180'}`} />
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Support Section */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl p-5 shadow-sm space-y-1">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <HelpCircle size={20} className="text-[#C0A94F]" />
                                <span className="font-bold text-gray-800">{t('support')}</span>
                            </div>
                            <ChevronLeft size={18} className={`text-gray-400 ${isRtl ? '' : 'rotate-180'}`} />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-[#C0A94F]" />
                                <span className="font-bold text-gray-800">{t('terms')}</span>
                            </div>
                            <ChevronLeft size={18} className={`text-gray-400 ${isRtl ? '' : 'rotate-180'}`} />
                        </div>
                    </motion.div>

                    {/* 5. Logout */}
                    <motion.button
                        variants={itemVariants}
                        className="w-full bg-[#EF4444] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-red-600 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>{t('logout')}</span>
                    </motion.button>

                </motion.div>
            </div>
            <BottomNavigation />
        </AppLayout>
    );
};

// Simple Toggle Component
const Toggle = ({ checked, onChange }) => (
    <div
        onClick={onChange}
        className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-[#C0A94F]' : 'bg-gray-300'}`}
    >
        <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-[-2px]' : 'translate-x-[22px]'}`} // RTL logic flip if needed, assuming LTR transform for now or handling via flex direction
            style={{ transform: checked ? 'translateX(0)' : 'translateX(20px)' }}
        ></div>
    </div>
);

export default ProfilePage;
