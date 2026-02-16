import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import BottomNavigation from '../components/layout/BottomNavigation';
import { ArrowRight, Minus, Plus, Banknote, Clock, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlatformData } from '../context/PlatformDataContext';

const SellOil = () => {
    const navigate = useNavigate();
    const { t, dir } = useLanguage();
    const { addOrder } = usePlatformData();
    const [liters, setLiters] = useState(1);
    const PRICE_PER_LITER = 30;
    const POINTS_PER_LITER = 5;

    const totalAmount = liters * PRICE_PER_LITER;
    const totalPoints = liters * POINTS_PER_LITER;

    const increment = () => setLiters(prev => prev + 1);
    const decrement = () => setLiters(prev => (prev > 1 ? prev - 1 : 1));

    const handleConfirm = () => {
        addOrder({
            amount: `${totalAmount} EGP`,
            user: 'Mobile User',
            status: 'Pending',
            liters,
            points: totalPoints
        });

        navigate('/tracking');
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-gray-50 pb-20 overflow-y-auto" dir={dir}>
                {/* Header */}
                <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <button onClick={() => navigate(-1)} className="p-2 bg-[#FEF9E6] rounded-full">
                        {dir === 'rtl' ? 
                            <ArrowRight size={20} className="text-[#C0A94F]" /> :
                            <ArrowRight size={20} className="text-[#C0A94F] rotate-180" />
                        }
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{t('sellTitle')}</h2>
                        <p className="text-xs text-gray-400">{t('sellSubtitle')}</p>
                    </div>
                    <div className="w-10"></div> {/* Spacer */}
                </div>

                <div className="p-4 space-y-6">
                    {/* Counter Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center gap-6">
                        <span className="text-gray-500 font-medium">{t('litersCount')}</span>

                        <div className="flex items-center gap-8">
                            <button 
                                onClick={decrement}
                                className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                <Minus size={24} />
                            </button>
                            
                            <span className="text-6xl font-black text-[#C0A94F] tabular-nums">
                                {liters}
                            </span>
                            
                            <button
                                onClick={increment}
                                className="w-14 h-14 rounded-full bg-[#FEF9E6] flex items-center justify-center text-[#C0A94F] hover:bg-[#FDF3D0] transition-colors shadow-sm"
                            >
                                <Plus size={24} />
                            </button>
                        </div>

                        <div className="w-full space-y-2 mt-2">
                            <div className="bg-[#FFF8E1] px-4 py-2 rounded-lg text-[#8B7500] text-sm font-bold text-center">
                                {t('pricePerLiter')}
                            </div>
                            {/* Total amount summary like the design */}
                            <div className="bg-gray-50 px-4 py-3 rounded-xl w-full text-center">
                                <p className="text-sm text-gray-500 mb-1 font-medium">
                                    {t('totalAmount')}
                                </p>
                                <p className="text-2xl font-black text-[#C0A94F]" dir={dir}>
                                    {totalAmount} <span className="text-base font-bold text-gray-500">{t('currency')}</span>
                                </p>
                                <p className="text-[11px] text-gray-400 mt-1" dir={dir}>
                                    {PRICE_PER_LITER} {t('currency')} × {liters} {t('liter')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Arrival Time */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">{t('expectedArrival')}</h3>
                                <p className="text-xs text-gray-400">{t('hours2_4')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Points earned card styled as a counter (moved above conditions) */}
                    <div className="bg-[#E6FFF4] rounded-2xl p-5 shadow-sm flex flex-col gap-2 border border-emerald-100">
                        <div className="flex items-center gap-2 text-emerald-700 text-sm">
                            <Award size={18} className="text-emerald-600" />
                            <span className="font-bold">{t('pointsEarned')}</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1" dir={dir}>
                            <span className="text-3xl font-black text-emerald-700">
                                {totalPoints}
                            </span>
                            <span className="text-xs font-bold text-emerald-800/80">{t('point')}</span>
                        </div>
                        <p className="text-[11px] text-emerald-700/80 mt-1" dir={dir}>
                            {POINTS_PER_LITER} {t('point')} × {liters} {t('liter')}
                        </p>
                    </div>

                    {/* Conditions Section moved lower on the screen */}
                    <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                        <h3 className="font-bold text-orange-800 mb-3 text-sm">{t('conditionsTitle')}</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-orange-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                {t('condition1')}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-orange-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                {t('condition2')}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-orange-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                {t('condition3')}
                            </li>
                        </ul>
                    </div>
                </div> {/* This closes the p-4 space-y-6 div */}
                <div className="p-6 bg-white border-t border-gray-100 mt-auto">
                    <button 
                        onClick={handleConfirm}
                        className="w-full bg-[#C0A94F] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#a89342] transition-colors text-lg"
                    >
                        {t('confirmRequest')}
                    </button>
                </div>
            </div>
            <BottomNavigation />
        </AppLayout>
    );
};

export default SellOil;
