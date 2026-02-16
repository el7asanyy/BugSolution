import React from 'react';
import { mockUsers } from '../../data/mockData';

const AdminUsers = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Users Management</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Join Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500">#{user.id}</td>
                                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                <td className="p-4 text-gray-600">{user.email}</td>
                                <td className="p-4 text-gray-600">{user.phone}</td>
                                <td className="p-4 text-gray-500">{user.joinDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
