import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { mockOrders as initialMockOrders, mockUsers as initialMockUsers } from '../data/mockData';

const PlatformDataContext = createContext(null);

export const PlatformDataProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => initialMockOrders);
  const [users, setUsers] = useState(() => initialMockUsers);
  const [activities, setActivities] = useState([]);

  // Helper to push an activity event (used as "real-time" feed / notifications)
  const pushActivity = (type, message, meta = {}) => {
    const activity = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      message,
      meta,
      createdAt: new Date().toISOString()
    };
    setActivities((prev) => [activity, ...prev].slice(0, 50));
  };

  const addOrder = (orderInput) => {
    const createdAt = new Date().toISOString();
    const newOrder = {
      id: orderInput.id || `#ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: orderInput.date || createdAt.slice(0, 10),
      user: orderInput.user || 'New User',
      amount: orderInput.amount,
      status: orderInput.status || 'Pending',
      liters: orderInput.liters ?? null,
      points: orderInput.points ?? null,
      createdAt
    };
    setOrders((prev) => [newOrder, ...prev]);
    pushActivity('order_created', `New order ${newOrder.id} created`, {
      id: newOrder.id,
      amount: newOrder.amount,
      user: newOrder.user
    });
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    pushActivity('order_status', `Order ${orderId} marked as ${status}`, {
      id: orderId,
      status
    });
  };

  const addUser = (userInput) => {
    const createdAt = new Date().toISOString();
    const newUser = {
      id: users.length + 1,
      name: userInput.name,
      email: userInput.email,
      phone: userInput.phone,
      joinDate: userInput.joinDate || createdAt.slice(0, 10)
    };
    setUsers((prev) => [newUser, ...prev]);
    pushActivity('user_created', `New user ${newUser.name} joined`, {
      id: newUser.id,
      name: newUser.name
    });
    return newUser;
  };

  // Smart analytics computed from orders / users
  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => {
      const num = parseFloat(String(o.amount).replace(/[^\d.]/g, ''));
      return sum + (Number.isNaN(num) ? 0 : num);
    }, 0);

    const completedOrders = orders.filter((o) => o.status === 'Completed');
    const pendingOrders = orders.filter((o) => o.status === 'Pending');
    const processingOrders = orders.filter((o) => o.status === 'Processing');

    const activeUsers = users.length;

    const avgTicket =
      completedOrders.length > 0
        ? Math.round(
            completedOrders.reduce((sum, o) => {
              const num = parseFloat(String(o.amount).replace(/[^\d.]/g, ''));
              return sum + (Number.isNaN(num) ? 0 : num);
            }, 0) / completedOrders.length
          )
        : 0;

    // Status distribution as percentage for "smart" dashboard
    const totalOrders = orders.length || 1;
    const statusDistribution = {
      completed: Math.round((completedOrders.length / totalOrders) * 100),
      pending: Math.round((pendingOrders.length / totalOrders) * 100),
      processing: Math.round((processingOrders.length / totalOrders) * 100)
    };

    return {
      totalRevenue,
      completedCount: completedOrders.length,
      pendingCount: pendingOrders.length,
      processingCount: processingOrders.length,
      activeUsers,
      avgTicket,
      statusDistribution
    };
  }, [orders, users]);

  // Simulate external "real-time" orders arriving when admin dashboard is open
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to auto-push a demo order, feels like live system
      if (Math.random() < 0.2) {
        const randomAmount = 100 + Math.round(Math.random() * 400);
        addOrder({
          amount: `${randomAmount} EGP`,
          user: 'Auto-generated',
          status: 'Pending'
        });
      }
    }, 25000);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({
      orders,
      users,
      activities,
      metrics,
      addOrder,
      addUser,
      updateOrderStatus
    }),
    [orders, users, activities, metrics]
  );

  return (
    <PlatformDataContext.Provider value={value}>
      {children}
    </PlatformDataContext.Provider>
  );
};

export const usePlatformData = () => {
  const ctx = useContext(PlatformDataContext);
  if (!ctx) {
    throw new Error('usePlatformData must be used within PlatformDataProvider');
  }
  return ctx;
};


