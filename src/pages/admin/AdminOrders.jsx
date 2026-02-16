import React, { useMemo, useState } from 'react';
import { usePlatformData } from '../../context/PlatformDataContext';

const statusColors = {
    Completed: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Processing: 'bg-blue-100 text-blue-700',
    Cancelled: 'bg-red-100 text-red-700'
};

const AdminOrders = () => {
    const { orders, metrics } = usePlatformData();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                !search ||
                order.id.toLowerCase().includes(search.toLowerCase()) ||
                order.user.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'ALL' ? true : order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [orders, search, statusFilter]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Orders Dashboard</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Live view of all collection requests and their performance.
                    </p>
                </div>
            </div>

            {/* Smart KPI cards */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Total Revenue</p>
                    <p className="mt-2 text-2xl font-bold text-[#C0A94F]">
                        {metrics.totalRevenue.toLocaleString()} EGP
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Active Orders</p>
                    <p className="mt-2 text-2xl font-bold text-blue-600">
                        {metrics.pendingCount + metrics.processingCount}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Completed</p>
                    <p className="mt-2 text-2xl font-bold text-green-600">
                        {metrics.completedCount}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Avg. Ticket</p>
                    <p className="mt-2 text-2xl font-bold text-gray-800">
                        {metrics.avgTicket} EGP
                    </p>
                </div>
            </div>

            {/* Filters & search */}
            <div className="flex items-center justify-between gap-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by order ID or customer name..."
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0A94F] focus:border-transparent"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C0A94F] focus:border-transparent"
                >
                    <option value="ALL">All statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                            <th className="p-3 text-xs uppercase tracking-wide">Order ID</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Date</th>
                            <th className="p-3 text-xs uppercase tracking-wide">User</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Amount</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 font-medium text-gray-900">{order.id}</td>
                                <td className="p-3 text-gray-600">{order.date}</td>
                                <td className="p-3 text-gray-900">{order.user}</td>
                                <td className="p-3 font-bold text-[#C0A94F]">{order.amount}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            statusColors[order.status] || 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-6 text-center text-sm text-gray-400"
                                >
                                    No orders match your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
