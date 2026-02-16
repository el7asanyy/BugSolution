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
            <div className="flex flex-col h-full bg-[#F8F8F8] pb-24 overflow-y-auto" dir={dir}>
                {/* Header */}
                <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
                    <button onClick={() => navigate(-1)} className="p-2 bg-[#FEF9E6] rounded-full shadow-sm">
                        {dir === 'rtl' ? 
                            <ArrowRight size={22} className="text-[#C0A94F]" /> :
                            <ArrowRight size={22} className="text-[#C0A94F] rotate-180" />
                        }
                    </button>
                    <h2 className="text-xl font-bold text-[#333] flex-1 text-center">{t('sellTitle')}</h2>
                    <div className="w-10"></div> {/* Spacer to keep title centered */}
                </div>

                <div className="p-6 flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-[#333] mb-6 mt-2">{t('sellQuestion')}</h3>

                    {/* Counter Section */}
                    <div className="bg-white rounded-[40px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full flex flex-col items-center">
                        <div className="flex items-center justify-between w-full mb-8">
                            <button
                                onClick={increment}
                                className="w-16 h-16 rounded-2xl bg-[#C0A94F] flex items-center justify-center text-white hover:bg-[#a89342] transition-all shadow-lg active:scale-95"
                            >
                                <Plus size={32} strokeWidth={3} />
                            </button>
                            
                            <div className="flex flex-col items-center">
                                <span className="text-7xl font-bold text-[#C0A94F] leading-none mb-1">
                                    {liters}
                                </span>
                                <span className="text-xl font-bold text-gray-400">{t('liter')}</span>
                            </div>
                            
                            <button 
                                onClick={decrement}
                                className="w-16 h-16 rounded-2xl bg-[#FEF9E6] flex items-center justify-center text-[#C0A94F] hover:bg-[#FDF3D0] transition-colors active:scale-95"
                            >
                                <Minus size={32} strokeWidth={3} />
                            </button>
                        </div>

                        <div className="w-full h-[1px] bg-gray-100 mb-8"></div>

                        <div className="w-full text-center">
                            <p className="text-xl font-bold text-gray-400 mb-2">{t('totalAmountLabel')}</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-bold text-[#C0A94F]">{totalAmount}</span>
                                <span className="text-2xl font-bold text-[#C0A94F] ml-1">{t('currency')}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2 font-medium">
                                {liters} {t('liter')} × {PRICE_PER_LITER} {t('currency')}
                            </p>
                        </div>
                    </div>

                    <div className="w-full space-y-4 mt-6">
                        {/* Arrival Time */}
                        <div className="bg-[#D9EFE3] p-5 rounded-[25px] flex items-center justify-between shadow-sm">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#C0A94F] shadow-sm ml-2 mr-2">
                                <Clock size={24} />
                            </div>
                            <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} flex-1`}>
                                <h3 className="font-bold text-[#555] text-base mb-1">{t('expectedArrivalTitle')}</h3>
                                <p className="text-2xl font-bold text-[#333]">{t('hours2_4')}</p>
                                <p className="text-[10px] text-gray-500 mt-1">{t('expectedArrivalDesc')}</p>
                            </div>
                        </div>

                        {/* Points Earned */}
                        <div className="bg-[#FCEBDC] p-5 rounded-[25px] flex items-center justify-between shadow-sm">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#C0A94F] shadow-sm ml-2 mr-2">
                                <Award size={24} />
                            </div>
                            <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} flex-1`}>
                                <h3 className="font-bold text-[#555] text-base mb-1">{t('pointsEarnedTitle')}</h3>
                                <div className="flex items-baseline gap-1" style={{ justifyContent: dir === 'rtl' ? 'flex-start' : 'flex-start' }}>
                                    <span className="text-2xl font-bold text-[#333]">{t('pointsCount', { count: totalPoints })}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1" dir={dir}>
                                    {t('pointsPerLiterDesc', { points: POINTS_PER_LITER, liters: liters })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-[#F8F8F8] mt-auto">
                    <button 
                        onClick={handleConfirm}
                        className="w-full bg-[#C0A94F] text-white font-bold py-5 rounded-[20px] shadow-lg hover:bg-[#a89342] transition-all text-xl active:scale-[0.98]"
                    >
                        {t('confirmRequestBtn')}
                    </button>
                </div>
            </div>
            <BottomNavigation />
        </AppLayout>
    );
};

export default SellOil;
