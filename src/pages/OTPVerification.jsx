import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useLanguage } from '../context/LanguageContext';

const OTPVerification = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);

    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== '') {
            if (index < 3 && inputs.current[index + 1]) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleConfirm = () => {
        // Validation logic here
        navigate('/verified');
    };

    return (
        <AppLayout>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#FFF4E6] rounded-full flex items-center justify-center mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C0A94F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.779-7.779zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold mb-2">{t('otpTitle')}</h2>
                        <p className="text-gray-500 mb-8 text-center" dir="ltr">
                             {t('otpSubtitle')} <span className="font-bold text-black">+20 123 456 7890</span>
                        </p>

                        <div className="flex gap-4 mb-8" dir="ltr">
                            {otp.map((data, index) => (
                                <input
                                    className="w-14 h-14 border border-gray-300 rounded-xl text-center text-2xl font-bold focus:border-[#C0A94F] focus:ring-1 focus:ring-[#C0A94F] outline-none transition-all"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    // onKeyDown={e => handleKeyDown(e, index)} // Add backspace handling if needed
                                    ref={el => inputs.current[index] = el}
                                />
                            ))}
                        </div>

                        <button 
                            onClick={handleConfirm}
                            className="w-full bg-[#C0A94F] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#a89342] transition-colors text-xl"
                        >
                            {t('confirm')}
                        </button>
                    </div>
                </div>
            </div>
            {/* Background Content (blurred) */}
             <div className="h-full bg-white p-6 blur-sm">
                {/* Content... doesn't matter much as it's blurred */}
             </div>
        </AppLayout>
    );
};

export default OTPVerification;
