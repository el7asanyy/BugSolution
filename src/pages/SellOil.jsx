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

    const increment = () => setLiters(prev => prev + 1);
    const decrement = () => setLiters(prev => (prev > 1 ? prev - 1 : 1));

    const handleConfirm = () => {
        const amount = liters * PRICE_PER_LITER;
        const points = liters * POINTS_PER_LITER;

        addOrder({
            amount: `${amount} EGP`,
            user: 'Mobile User',
            status: 'Pending',
            liters,
            points
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

                        <div className="bg-[#FFF8E1] px-4 py-2 rounded-lg text-[#8B7500] text-sm font-bold">
                             {t('pricePerLiter')}
                        </div>
                    </div>

                    {/* Conditions Section */}
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

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Total Amount */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-gray-500 text-sm">
                                 <Banknote size={18} />
                                 <span>{t('totalAmount')}</span>
                             </div>
                             <div className="flex items-baseline gap-1" dir={dir}>
                                 <span className="text-3xl font-black text-[#C0A94F]">{liters * PRICE_PER_LITER}</span>
                                 <span className="text-xs font-bold text-gray-400">{t('currency')}</span>
                             </div>
                        </div>

                        {/* Points */}
                         <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-gray-500 text-sm">
                                 <Award size={18} />
                                 <span>{t('pointsEarned')}</span>
                             </div>
                             <div className="flex items-baseline gap-1" dir={dir}>
                                 <span className="text-3xl font-black text-[#B8A346]">{liters * POINTS_PER_LITER}</span>
                                 <span className="text-xs font-bold text-gray-400">{t('point')}</span>
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
