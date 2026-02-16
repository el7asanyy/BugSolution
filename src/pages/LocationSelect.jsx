import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AppLayout from '../components/layout/AppLayout';
import { Search, MapPin, Navigation, Home, Building } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Fix for default marker icon in Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationSelect = () => {
    const navigate = useNavigate();
    const { t, dir } = useLanguage();
    const [activeTab, setActiveTab] = useState('map'); // 'map' or 'manual'
    const [position, setPosition] = useState([30.0444, 31.2357]); // Default: Cairo
    
    // Component to handle map clicks
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    }

    const handleConfirm = () => {
        navigate('/home');
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-white relative" dir={dir}>
                
                {/* Search Bar (Floating) */}
                <div className="absolute top-4 left-4 right-4 z-[1000]">
                    <div className="bg-white rounded-xl shadow-lg flex items-center p-3">
                        <Search className="text-gray-400 mx-2" size={20} />
                        <input 
                            type="text" 
                            placeholder={t('searchPlaceholder')}
                            className="flex-1 outline-none px-2 bg-transparent"
                            dir={dir}
                        />
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="absolute top-20 left-4 right-4 z-[1000] flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-md flex">
                        <button 
                            onClick={() => setActiveTab('map')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'map' ? 'bg-[#C0A94F] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {t('mapSelection')}
                        </button>
                        <button 
                            onClick={() => setActiveTab('manual')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'manual' ? 'bg-[#C0A94F] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {t('manualEntry')}
                        </button>
                    </div>
                </div>

                {/* Map View */}
                {activeTab === 'map' && (
                    <div className="flex-1 relative z-0 h-full">
                         <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                        
                        {/* Bottom Actions */}
                        <div className="absolute bottom-4 left-4 right-4 z-[1000] space-y-3">
                             <button className="bg-white text-black p-3 rounded-xl shadow-lg flex items-center justify-center gap-2 w-full font-bold hover:bg-gray-50">
                                <Navigation size={18} className="text-[#C0A94F]" />
                                {t('useCurrentLocation')}
                             </button>
                             <button 
                                onClick={handleConfirm}
                                className="bg-[#C0A94F] text-white p-4 rounded-xl shadow-lg w-full font-bold text-lg hover:bg-[#a89342]"
                             >
                                {t('confirmLocation')}
                             </button>
                        </div>
                    </div>
                )}

                {/* Manual Entry Form */}
                {activeTab === 'manual' && (
                    <div className="flex-1 bg-gray-50 pt-32 px-4 pb-4 overflow-y-auto">
                        <div className="bg-white rounded-2xl p-6 shadow-sm mb-20">
                            <h3 className="text-xl font-bold mb-6 text-center text-gray-800">{t('enterAddressDetails')}</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-500 text-sm mb-2 font-medium px-1">{t('streetName')}</label>
                                    <div className="relative">
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 px-10 focus:border-[#C0A94F] focus:ring-1 focus:ring-[#C0A94F] outline-none transition-all" dir={dir} />
                                        <MapPin className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} size={18} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-gray-500 text-sm mb-2 font-medium px-1">{t('buildingNum')}</label>
                                        <div className="relative">
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 px-10 focus:border-[#C0A94F] focus:ring-1 focus:ring-[#C0A94F] outline-none transition-all" dir={dir} />
                                            <Home className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-2 font-medium px-1">{t('floorNum')}</label>
                                        <div className="relative">
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 px-10 focus:border-[#C0A94F] focus:ring-1 focus:ring-[#C0A94F] outline-none transition-all" dir={dir} />
                                            <Building className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-500 text-sm mb-2 font-medium px-1">{t('notes')}</label>
                                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-[#C0A94F] focus:ring-1 focus:ring-[#C0A94F] outline-none transition-all h-24 resize-none" dir={dir}></textarea>
                                </div>
                            </div>
                        </div>

                         <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                             <button 
                                onClick={handleConfirm}
                                className="bg-[#C0A94F] text-white p-4 rounded-xl shadow-lg w-full font-bold text-lg hover:bg-[#a89342]"
                             >
                                {t('confirmLocation')}
                             </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default LocationSelect;
