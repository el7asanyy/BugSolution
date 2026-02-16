import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import { ArrowRight, Search, SlidersHorizontal, Droplets, Star, Gift, XCircle, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { t, dir, language } = useLanguage();
  const isRtl = dir === 'rtl';
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
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

  const transactions = [
    {
      id: 1,
      type: 'sale',
      title: language === 'ar' ? 'بيع 10 لتر زيت' : 'Sold 10L Oil',
      subtitle: t('successCollection'),
      time: `10:30 ${t('am')}`,
      date: t('today'),
      amount: `+300 ${t('currency')}`,
      status: 'confirmed',
      icon: <Droplets className="text-yellow-600" size={20} />,
      iconBg: 'bg-yellow-50',
    },
    {
      id: 2,
      type: 'points',
      title: language === 'ar' ? 'نقاط مكتسبة' : 'Points Earned',
      subtitle: t('pointsReferral'),
      time: `10:31 ${t('am')}`,
      date: t('today'),
      amount: `+50 ${t('point')}`,
      status: 'confirmed',
      icon: <Star className="text-yellow-500" size={20} />,
      iconBg: 'bg-yellow-50',
    },
    {
      id: 3,
      type: 'sale',
      title: language === 'ar' ? 'بيع 5 لتر زيت' : 'Sold 5L Oil',
      subtitle: t('nearPointCollection'),
      time: `3:45 ${t('pm')}`,
      date: t('yesterday'),
      amount: `+150 ${t('currency')}`,
      status: 'confirmed',
      icon: <Droplets className="text-yellow-600" size={20} />,
      iconBg: 'bg-yellow-50',
    },
    {
      id: 4,
      type: 'redeem',
      title: language === 'ar' ? 'استرداد نقاط' : 'Points Redeemed',
      subtitle: t('pointsRedeemedDesc'),
      time: `2:20 ${t('pm')}`,
      date: t('yesterday'),
      amount: `-100 ${t('point')}`,
      status: 'confirmed',
      icon: <Gift className="text-orange-500" size={20} />,
      iconBg: 'bg-orange-50',
    },
    {
      id: 5,
      type: 'canceled',
      title: language === 'ar' ? 'طلب ملغي' : 'Canceled Order',
      subtitle: t('canceledDesc'),
      time: t('daysAgo').replace('{days}', '3'),
      date: t('previously'),
      amount: t('canceled'),
      status: 'canceled',
      icon: <XCircle className="text-red-500" size={20} />,
      iconBg: 'bg-red-50',
    },
    {
      id: 6,
      type: 'sale',
      title: language === 'ar' ? 'بيع 15 لتر زيت' : 'Sold 15L Oil',
      subtitle: t('largeSaleBonus'),
      time: t('daysAgo').replace('{days}', '5'),
      date: t('previously'),
      amount: `+450 ${t('currency')}`,
      status: 'confirmed',
      icon: <Droplets className="text-yellow-600" size={20} />,
      iconBg: 'bg-yellow-50',
    }
  ];

  const groupedTransactions = transactions.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  const dateOrder = [t('today'), t('yesterday'), t('previously')];

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-gray-50 pb-24 overflow-y-auto custom-scrollbar" dir={dir}>
        {/* Header */}
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100"
        >
          <div className="w-10">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="p-2 bg-[#FEF9E6] rounded-xl shadow-sm"
            >
              <ArrowRight size={20} className={`text-[#C0A94F] ${!isRtl && 'rotate-180'}`} />
            </motion.button>
          </div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">{t('history')}</h1>
          <div className="w-10"></div>
        </motion.div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 space-y-6"
        >
          {/* Search & Filter */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <div className="relative flex-1 group">
              <span className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-gray-400 group-focus-within:text-[#C0A94F] transition-colors`}>
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder={t('searchHistory')}
                className={`w-full bg-white border border-gray-100 rounded-2xl py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm focus:outline-none focus:ring-4 focus:ring-[#C0A94F]/10 shadow-sm border-gray-100 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFF4E6] p-4 rounded-2xl text-[#E67E22] shadow-sm hover:bg-orange-100 transition-colors"
            >
              <SlidersHorizontal size={24} />
            </motion.button>
          </motion.div>

          {/* Transaction List */}
          <div className="space-y-8">
            {dateOrder.map(dateGroup => {
              if (!groupedTransactions[dateGroup]) return null;
              return (
                <div key={dateGroup} className="space-y-4">
                  {/* Date Separator */}
                  <motion.div variants={itemVariants} className="flex items-center gap-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 uppercase tracking-widest">
                        {dateGroup} {dateGroup === t('today') && `- ${new Date().getDate()} ${t('february')}`}
                        {dateGroup === t('yesterday') && `- ${new Date().getDate() - 1} ${t('february')}`}
                    </span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </motion.div>

                  <div className="space-y-3">
                    {groupedTransactions[dateGroup].map(item => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, x: isRtl ? -5 : 5 }}
                        className="bg-white rounded-[2rem] p-4 flex items-center justify-between shadow-sm border border-gray-50/50 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${item.iconBg} rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:rotate-6`}>
                            {item.icon}
                          </div>
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
                            <p className="text-[13px] text-gray-500 font-medium">{item.subtitle}</p>
                            <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400 font-bold">
                                <Clock size={10} />
                                {item.time} {item.date !== t('previously') && `- ${item.date}`}
                            </div>
                          </div>
                        </div>
                        <div className={`flex flex-col gap-2 ${isRtl ? 'items-end' : 'items-start'}`}>
                          <span className={`font-black text-lg drop-shadow-sm ${
                            item.type === 'sale' ? 'text-yellow-600' :
                            item.type === 'points' ? 'text-yellow-500' :
                            item.type === 'redeem' ? 'text-orange-600' : 'text-red-500'
                          }`}>
                            {item.amount}
                          </span>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            item.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {item.status === 'confirmed' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                            {t(item.status)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default TransactionHistory;
