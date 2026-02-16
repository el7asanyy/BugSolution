import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import BottomNavigation from '../components/layout/BottomNavigation';
import { ArrowRight, Phone, MessageCircle, Edit3, XCircle, Check, Clock, MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const OrderTracking = () => {
    const navigate = useNavigate();
    const { t, dir } = useLanguage();
    const isRtl = dir === 'rtl';

    // Simulation state: 'confirmed', 'onWay', 'atLocation', 'completed'
    const [status, setStatus] = useState('confirmed');

    // Demo: Auto-advance status for visualization (optional, can be removed)
    useEffect(() => {
        const timers = [];
        timers.push(setTimeout(() => setStatus('onWay'), 5000));
        timers.push(setTimeout(() => setStatus('atLocation'), 10000));
        timers.push(setTimeout(() => setStatus('completed'), 15000));
        return () => timers.forEach(clearTimeout);
    }, []);

    const steps = [
        { key: 'confirmed', label: 'confirmed' },
        { key: 'onWay', label: 'onWay' },
        { key: 'atLocation', label: 'atLocation' },
        { key: 'completed', label: 'completed' }
    ];

    const currentStepIndex = steps.findIndex(s => s.key === status);

    if (status === 'completed') {
        return (
            <AppLayout>
                <div className="flex flex-col h-full bg-gray-50 pb-20 justify-center items-center p-6" dir={dir}>
                    <div className="w-full bg-[#00BFA5] rounded-3xl p-8 text-white text-center shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
                                <Check size={40} className="text-[#00BFA5]" strokeWidth={4} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{t('collectionComplete')}</h2>
                            <p className="text-white/90 mb-8">{t('thankYou')}</p>
                            
                            <div className="space-y-4 w-full">
                                <div className="bg-white/20 rounded-xl p-4 flex justify-between items-center">
                                    <span className="font-medium">{t('collectedQty')}</span>
                                    <span className="font-bold text-xl">45 {t('liter')}</span>
                                </div>
                                <div className="bg-white/20 rounded-xl p-4 flex justify-between items-center">
                                    <span className="font-medium">{t('pointsAdded')}</span>
                                    <span className="font-bold text-xl">+ 225 {t('point')}</span>
                                </div>
                            </div>

                            <button onClick={() => navigate('/home')} className="mt-8 bg-white text-[#00BFA5] font-bold py-3 px-8 rounded-xl shadow-sm hover:bg-gray-50 transition-colors w-full">
                                {t('navHome')}
                            </button>
                        </div>
                    </div>
                </div>
                <BottomNavigation />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-gray-50 pb-20 overflow-y-auto" dir={dir}>
                {/* Header */}
                <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <div className="w-10"></div> {/* Spacer */}
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{t('orderDetails')}</h2>
                        <p className="text-xs text-gray-400">#A12345</p>
                    </div>
                    {/* Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        status === 'onWay' || status === 'atLocation' ? 'bg-[#C0A94F]/20 text-[#C0A94F]' :
                        'bg-gray-100 text-gray-500'
                    }`}>
                        {t(status)}
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Order Info Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
                         <div className="flex justify-between items-center">
                             <span className="text-gray-500 text-sm font-bold">{t('quantity')}:</span>
                             <span className="font-bold text-lg">45 {t('liter')}</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-gray-500 text-sm font-bold">{t('totalAmount')}:</span>
                             <span className="font-bold text-lg text-[#C0A94F]">1350 {t('currency')}</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-gray-500 text-sm font-bold">{t('pointsEarned')}:</span>
                             <span className="font-bold text-lg">+ 225 {t('point')}</span>
                         </div>
                         <div className="border-t border-gray-100 my-2"></div>
                         <div className="flex justify-between items-center text-xs text-gray-400">
                             <span>{t('orderDate')}:</span>
                             <span dir="ltr">15 Feb 2026, 2:30 PM</span>
                         </div>
                    </div>

                    {/* ETA Card */}
                    <div className="bg-[#C0A94F] rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
                        <div>
                            <span className="text-white/80 text-sm font-medium">{t('expectedArrival')}</span>
                            <h3 className="text-xl font-bold">
                                {status === 'confirmed' ? t('hoursRange') :
                                 status === 'onWay' ? t('minutesRange') :
                                 t('now')}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Clock size={24} className="text-white" />
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>
                             {/* Colored Progress Line */}
                            <div 
                                className={`absolute top-1/2 ${isRtl ? 'right-0' : 'left-0'} h-1 bg-[#C0A94F] -z-10 transform -translate-y-1/2 transition-all duration-500`}
                                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;
                                return (
                                    <div key={step.key} className="flex flex-col items-center gap-2 bg-white px-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                                            isCompleted ? 'bg-[#C0A94F] border-[#C0A94F] text-white' : 'bg-white border-gray-200 text-gray-400'
                                        }`}>
                                            {isCompleted ? <Check size={14} strokeWidth={3} /> : index + 1}
                                        </div>
                                        <span className={`text-[10px] font-bold ${isCurrent ? 'text-gray-800' : 'text-gray-400'}`}>
                                            {t(step.label)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Map / Tracking */}
                    <div className="bg-white rounded-3xl p-1 shadow-sm overflow-hidden h-40 relative">
                         <div className="absolute inset-0 bg-gray-100 flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-50">
                             {/* Placeholder Map Visual */}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center">
                             <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg animate-pulse">
                                 <MapPin size={32} className="text-[#C0A94F]" fill="#C0A94F" />
                             </div>
                         </div>
                         <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md p-3 text-center text-xs font-bold text-gray-600">
                             {status === 'confirmed' ? t('locationUpdateNote') : t('liveTracking')}
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 bg-[#C0A94F] text-white py-4 rounded-2xl font-bold shadow-sm hover:bg-[#a89342] transition-colors col-span-1">
                            <Phone size={18} />
                            <span>{t('callCollector')}</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-700 py-4 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-colors col-span-1">
                            <MessageCircle size={18} />
                            <span>{t('chatWhatsapp')}</span>
                        </button>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-700 py-4 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-colors">
                        <Edit3 size={18} />
                        <span>{t('editAddress')}</span>
                    </button>

                    <div className="pt-2">
                        <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-100 transition-colors">
                            <XCircle size={18} />
                            <span>{t('cancelOrder')}</span>
                        </button>
                         <p className="text-center text-[10px] text-gray-400 mt-2">
                            {t('cancelNote')}
                        </p>
                    </div>

                </div>
            </div>
            <BottomNavigation />
        </AppLayout>
    );
};

export default OrderTracking;
