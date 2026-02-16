import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { ArrowRight, Check } from 'lucide-react';

const VerifiedSuccess = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-white relative">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
             <div className="w-10"></div> {/* Spacer */}
             <h2 className="text-xl font-bold">إنشاء حساب جديد</h2>
             <button onClick={() => navigate(-1)} className="p-2">
                 <ArrowRight size={24} className="text-black" />
             </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            
            {/* Success Icon */}
            <div className="w-24 h-24 bg-[#F5F2DF] rounded-full flex items-center justify-center mb-6">
                <Check size={40} className="text-[#C0A94F]" strokeWidth={3} />
            </div>

            <h1 className="text-2xl font-black text-black mb-3">تم التحقق بنجاح!</h1>
            <p className="text-gray-500 mb-12 px-4 leading-relaxed">
                الآن دعينا نضيف عنوان منزلك لتسهيل عملية الاستلام
            </p>

            {/* Buttons */}
            <button 
                onClick={() => navigate('/location')}
                className="w-full bg-[#C0A94F] text-white font-bold py-4 rounded-xl shadow-md hover:bg-[#a89342] transition-colors mb-6 text-lg"
            >
                أضف عنوانك الآن (موصى به)
            </button>

            <button 
                onClick={() => navigate('/home')}
                className="text-gray-500 underline text-sm hover:text-gray-700 font-medium"
            >
                سأضيفه لاحقاً
            </button>

        </div>
      </div>
    </AppLayout>
  );
};

export default VerifiedSuccess;
