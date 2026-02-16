import React, { useMemo, useState } from 'react';
import { usePlatformData } from '../../context/PlatformDataContext';

const AdminUsers = () => {
    const { users, metrics } = usePlatformData();
    const [search, setSearch] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const query = search.toLowerCase();
            return (
                !query ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone.toLowerCase().includes(query)
            );
        });
    }, [users, search]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-1 text-gray-800">Users Management</h2>
                    <p className="text-sm text-gray-500">
                        Monitor your customer base and engagement quality in real time.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2 text-right">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                        Active Users
                    </p>
                    <p className="text-xl font-bold text-[#C0A94F]">{metrics.activeUsers}</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C0A94F] focus:border-transparent"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                            <th className="p-3 text-xs uppercase tracking-wide">ID</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Name</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Email</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Phone</th>
                            <th className="p-3 text-xs uppercase tracking-wide">Join Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 text-gray-500">#{user.id}</td>
                                <td className="p-3 font-medium text-gray-900">{user.name}</td>
                                <td className="p-3 text-gray-600">{user.email}</td>
                                <td className="p-3 text-gray-600">{user.phone}</td>
                                <td className="p-3 text-gray-500">{user.joinDate}</td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-6 text-center text-sm text-gray-400"
                                >
                                    No users match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
