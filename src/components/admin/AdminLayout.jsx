import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { usePlatformData } from '../../context/PlatformDataContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { activities } = usePlatformData();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/orders', label: 'Orders' },
        { path: '/admin/users', label: 'Users' }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg border-r border-gray-100 flex flex-col">
                <div className="p-6 flex flex-col items-center border-b border-gray-100">
                    <img src={logo} alt="Logo" className="w-16 h-auto mb-2" />
                    <span className="font-bold text-gray-800">Admin Panel</span>
                    <span className="mt-1 text-xs text-gray-400">
                        Real-time oil collection overview
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                                location.pathname === item.path
                                    ? 'bg-[#C0A94F] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Live activity feed */}
                <div className="border-t border-gray-100 p-4 h-56 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Live Activity
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                        </span>
                    </div>
                    {activities.length === 0 ? (
                        <p className="text-xs text-gray-400">
                            Waiting for new orders and users...
                        </p>
                    ) : (
                        <ul className="space-y-2 text-xs">
                            {activities.slice(0, 6).map((activity) => (
                                <li
                                    key={activity.id}
                                    className="p-2 rounded-lg bg-gray-50 border border-gray-100"
                                >
                                    <p className="font-medium text-gray-700">
                                        {activity.message}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        {new Date(activity.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                    >
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
