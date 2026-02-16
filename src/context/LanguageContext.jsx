import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  ar: {
    // Onboarding
    onboardingTitle: "حافظي على بيتك وكوكبنا...\nوحققي مكافآت!",
    onboardingDesc: "مع تطبيقنا، كل زيت مستعمل في مطبخك ليه قيمة! نظمي جمع الزيت بسهولة من بيتك، استبدليه بنقاط، منتجات، أو فلوس، وساعدي على حماية البيئة في نفس الوقت.",
    registerNow: "سجل الآن",
    
    // Register
    registerTitle: "سجل برقم هاتفك",
    phonePlaceholder: "رقم الهاتف",
    continueWith: "أو سجل باستخدام",
    google: "جوجل",
    facebook: "فيسبوك",
    
    // OTP
    otpTitle: "تأكيد رقم الهاتف",
    otpSubtitle: "تم إرسال رمز التحقق إلى",
    confirm: "تأكيد",
    
    // Verified
    verifiedSuccess: "تم التحقق بنجاح!",
    addAddressNow: "أضف عنوانك الآن",
    later: "لاحقاً",

    // Location
    mapSelection: "تحديد على الخريطة",
    manualEntry: "إدخال يدوي",
    searchPlaceholder: "ابحث عن موقعك...",
    useCurrentLocation: "استخدم موقعي الحالي",
    confirmLocation: "تأكيد الموقع",
    streetName: "اسم الشارع",
    buildingNum: "رقم المبنى",
    floorNum: "الدور / الشقة",
    notes: "ملاحظات إضافية (اختياري)",
    enterAddressDetails: "أدخل تفاصيل العنوان",

    // Home
    bannerTitle: "حولي زيتك لذهب!",
    bannerDesc: "جمعي الزيت وبدليه بفلوس وكاش",
    conditionsTitle: "شروط استلام الزيت",
    condition1: "الزيت يكون بارد تماماً",
    condition2: "خالي من بقايا الطعام",
    condition3: "في عبوة محكمة الغلق",

    // Home
    welcome: "مرحباً، أم محمد 👋",
    oilPriceTitle: "سعر لتر الزيت اليوم",
    currency: "جنيه",
    dailyUpdate: "يتم التحديث يومياً",
    updateNote: "السعر ثابت وموثوق لجميع الأشخاص",
    sellOilNow: "بيع الزيت الآن",
    totalSales: "إجمالي المبيعات",
    rewardPoints: "نقاط المكافآت",
    liter: "لتر",
    point: "نقطة",
    environmentalImpact: "أثرك البيئي",
    impactDesc: "ساهمت في حماية 45,000 لتر من المياة من التلوث",
    navHome: "الرئيسية",
    navSell: "بيع الزيت",
    navPoints: "نقاطي",
    navProfile: "حسابي",

    // Sell Oil
    sellTitle: "بيع الزيت",
    sellSubtitle: "حددي الكمية اللي محتاجة تبيعيها",
    litersCount: "عدد اللترات",
    pricePerLiter: "سعر اللتر: 30 جنيه",
    totalAmount: "المبلغ الكلي",
    expectedArrival: "موعد الوصول المتوقع",
    hours2_4: "خلال 2-4 ساعات",
    pointsEarned: "النقاط المكتسبة",
    confirmRequest: "تأكيد الطلب",

    // Points
    pointsTitle: "نقاطي",
    pointsSubtitle: "شوفي تقدمك واستخدمي مكافآتك",
    weeklyOffer: "عرض الأسبوع 🔥",
    offerDesc: "كل لتر = 10 نقاط",
    validUntil: "صالح حتى نهاية الشهر",
    moreInfo: "اعرف المزيد",
    level: "المستوى: فضي",
    toGold: "180 نقطة للوصول للمستوى الذهبي ✨",
    currentBalance: "رصيد النقاط الحالي",
    goal: "الهدف: 500 نقطة",
    soon: "قريباً! تبقى",
    forGift: "نقطة لهديتك",
    history: "سجل العمليات",
    sold10L: "بيع 10 لتر",
    sold8L: "بيع 8 لتر",
    referral: "إحالة صديقة",
    showMore: "عرض المزيد",
    redeemPoints: "استبدال النقاط",
    redeemNote: "استبدال النقاط متاح بدءاً من 500 نقطة",
    howToEarn: "كيف تكسبين المزيد من النقاط؟",
    earnSell: "بيع الزيت: 5 نقاط لكل لتر",
    earnReferral: "إحالة صديقة: 10 نقطة",

    // Profile
    profileTitle: "حسابي",
    userName: "أم محمد",
    orderHistory: "سجل الطلبات",
    settings: "الإعدادات",
    language: "اللغة",
    languageName: "العربية",
    darkMode: "الوضع الداكن",
    notifications: "الإشعارات",
    privacy: "الخصوصية والأمان",
    privacyDesc: "تغيير رقم الهاتف أو حذف الحساب",
    enabled: "مفعل",
    disabled: "معطل",
    support: "مساعدة",
    terms: "الشروط والخصوصية",
    logout: "تسجيل الخروج",
    switchLang: "English", // Button text to switch TO

    // Order Tracking
    orderDetails: "تفاصيل الطلب",
    orderNo: "رقم الطلب",
    quantity: "الكمية",
    totalAmount: "المبلغ الإجمالي",
    pointsEarned: "النقاط المكتسبة",
    orderDate: "وقت وتاريخ الطلب",
    expectedArrival: "متوقع الوصول",
    hoursRange: "خلال 2-4 ساعات",
    minutesRange: "خلال 30-45 دقيقة",
    now: "الآن",
    confirmed: "مؤكد",
    onWay: "في الطريق",
    atLocation: "عند الموقع",
    completed: "مكتمل",
    locationUpdateNote: "سيتم تحديث الموقع قبل الوصول",
    liveTracking: "يتم تتبع الموقع مباشرة",
    callCollector: "اتصال بالمجمع",
    chatWhatsapp: "دردشة / واتساب",
    editAddress: "تعديل العنوان",
    cancelOrder: "إلغاء الطلب",
    collectionComplete: "تم التجميع",
    collectedQty: "الكمية المجمعة",
    pointsAdded: "النقاط المضافة",
    thankYou: "شكراً لاستخدامك خدماتنا!",
    cancelNote: "الإلغاء مجاني خلال 10 دقائق من التأكيد",
    
    // History Page Extensions
    searchHistory: "ابحث عن عملية...",
    today: "اليوم",
    yesterday: "أمس",
    previously: "سابقاً",
    confirmed: "مؤكد",
    canceled: "ملغي",
    pointsEarnedStat: "نقاط مكتسبة",
    pointsRedeemed: "استرداد نقاط",
    soldOilTitle: "بيع {amount} لتر زيت",
    pointsReferral: "نقاط من عملية بيع سابقة",
    pointsRedeemedDesc: "تم استبدال النقاط بخصم",
    canceledDesc: "تم إلغاء الطلب من قبل العميل",
    daysAgo: "منذ {days} أيام",
    am: "صباحاً",
    pm: "مساءً",
    successCollection: "تم التجميع بنجاح من المنزل",
    nearPointCollection: "تم التجميع من نقطة التجميع القريبة",
    february: "فبراير",
    largeSaleBonus: "عملية بيع كبيرة - مكافأة إضافية",
  },
  en: {
    // Onboarding
    onboardingTitle: "Protect your home & planet...\nAnd earn rewards!",
    onboardingDesc: "With our app, every drop of used oil has value! Organize collection easily from home, exchange for points, cash, or products, and help save the environment.",
    registerNow: "Register Now",
    
    // Register
    registerTitle: "Register with Phone",
    phonePlaceholder: "Phone Number",
    continueWith: "Or continue with",
    google: "Google",
    facebook: "Facebook",
    
    // OTP
    otpTitle: "Verify Phone Number",
    otpSubtitle: "Verification code sent to",
    confirm: "Confirm",
    
    // Verified
    verifiedSuccess: "Verified Successfully!",
    addAddressNow: "Add Address Now",
    later: "Later",

    // Location
    mapSelection: "Map Selection",
    manualEntry: "Manual Entry",
    searchPlaceholder: "Search for location...",
    useCurrentLocation: "Use Current Location",
    confirmLocation: "Confirm Location",
    streetName: "Street Name",
    buildingNum: "Building No.",
    floorNum: "Floor / Apt",
    notes: "Additional Notes (Optional)",
    enterAddressDetails: "Enter Address Details",

    // Home
    bannerTitle: "Turn Oil into Gold!",
    bannerDesc: "Collect oil and exchange for cash",
    conditionsTitle: "Oil Collection Conditions",
    condition1: "Oil must be completely cold",
    condition2: "Free from food particles",
    condition3: "In a tightly sealed container",

    // Home
    welcome: "Welcome, Om Mohamed 👋",
    oilPriceTitle: "Today's Oil Price",
    currency: "EGP",
    dailyUpdate: "Updated Daily",
    updateNote: "Fixed and trusted price for everyone",
    sellOilNow: "Sell Oil Now",
    totalSales: "Total Sales",
    rewardPoints: "Reward Points",
    liter: "Liters",
    point: "Points",
    environmentalImpact: "Environmental Impact",
    impactDesc: "You helped save 45,000 liters of water from pollution",
    navHome: "Home",
    navSell: "Sell Oil",
    navPoints: "Points",
    navProfile: "Profile",

    // Sell Oil
    sellTitle: "Sell Oil",
    sellSubtitle: "Select quantity to sell",
    litersCount: "Number of Liters",
    pricePerLiter: "Price/Liter: 30 EGP",
    totalAmount: "Total Amount",
    expectedArrival: "Expected Arrival",
    hours2_4: "Within 2-4 Hours",
    pointsEarned: "Points Earned",
    confirmRequest: "Confirm Request",

    // Points
    pointsTitle: "My Points",
    pointsSubtitle: "Track progress and redeem rewards",
    weeklyOffer: "Weekly Offer 🔥",
    offerDesc: "1 Liter = 10 Points",
    validUntil: "Valid until end of month",
    moreInfo: "Learn More",
    level: "Level: Silver",
    toGold: "180 points to reach Gold Level ✨",
    currentBalance: "Current Points Balance",
    goal: "Goal: 500 Points",
    soon: "Soon! Only",
    forGift: "points left for your gift",
    history: "Transaction History",
    sold10L: "Sold 10 Liters",
    sold8L: "Sold 8 Liters",
    referral: "Friend Referral",
    showMore: "Show More",
    redeemPoints: "Redeem Points",
    redeemNote: "Redemption available starting from 500 points",
    howToEarn: "How to earn more points?",
    earnSell: "Sell Oil: 5 points per liter",
    earnReferral: "Friend Referral: 10 points",

    // Profile
    profileTitle: "My Profile",
    userName: "Om Mohamed",
    orderHistory: "Order History",
    settings: "Settings",
    language: "Language",
    languageName: "English",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    privacy: "Privacy & Security",
    privacyDesc: "Change phone or delete account",
    enabled: "On",
    disabled: "Off",
    support: "Help & Support",
    terms: "Terms & Privacy",
    logout: "Logout",
    switchLang: "العربية", // Button text to switch TO
    // OrderTracking
    orderDetails: "Order Details",
    orderNo: "Order No",
    quantity: "Quantity",
    totalAmount: "Total Amount",
    pointsEarned: "Points Earned",
    orderDate: "Order Date & Time",
    expectedArrival: "Expected Arrival",
    hoursRange: "Within 2-4 Hours",
    minutesRange: "Within 30-45 Mins",
    now: "Now",
    confirmed: "Confirmed",
    onWay: "On the Way",
    atLocation: "At Location",
    completed: "Completed",
    locationUpdateNote: "Location will update before arrival",
    liveTracking: "Live location tracking",
    callCollector: "Call Collector",
    chatWhatsapp: "Chat / WhatsApp",
    editAddress: "Edit Address",
    cancelOrder: "Cancel Order",
    collectionComplete: "Collection Complete",
    collectedQty: "Collected Quantity",
    pointsAdded: "Points Added",
    thankYou: "Thank you for using our services!",
    cancelNote: "Free cancellation within 10 minutes",

    // History Page Extensions
    searchHistory: "Search for a transaction...",
    today: "Today",
    yesterday: "Yesterday",
    previously: "Previously",
    confirmed: "Confirmed",
    canceled: "Canceled",
    pointsEarnedStat: "Points Earned",
    pointsRedeemed: "Points Redeemed",
    soldOilTitle: "Sold {amount}L Oil",
    pointsReferral: "Points from previous sale",
    pointsRedeemedDesc: "Points redeemed for discount",
    canceledDesc: "Order canceled by customer",
    daysAgo: "{days} days ago",
    am: "AM",
    pm: "PM",
    successCollection: "Successfully collected from home",
    nearPointCollection: "Collected from nearby collection point",
    february: "February",
    largeSaleBonus: "Large sale - Extra reward",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
