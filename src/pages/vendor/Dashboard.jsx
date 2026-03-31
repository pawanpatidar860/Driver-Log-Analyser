import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, AlertTriangle, Package, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 45,
    activeOrders: 12,
    lowStockItems: 3
  });

  const lowStockProducts = [
    { id: 1, name: 'Soya Gold Seeds (5kg)', stock: 4, category: 'Seeds' },
    { id: 2, name: 'Power Fertilizer (25kg)', stock: 2, category: 'Fertilizers' },
    { id: 3, name: 'Neem Oil Spray (1L)', stock: 3, category: 'Pesticides' }
  ];

  const recentOrders = [
    { id: 'ORD-123', customer: 'Ramesh Singh', amount: '₹12,400', status: 'Pending' },
    { id: 'ORD-124', customer: 'Suresh Patel', amount: '₹8,500', status: 'Processing' },
    { id: 'ORD-125', customer: 'Anil Kumar', amount: '₹3,200', status: 'Completed' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-agri-green">Vendor Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-agri-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-xl font-bold">{stats.totalProducts}</h3>
            </div>
            <Package className="text-agri-green" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Orders</p>
              <h3 className="text-xl font-bold">{stats.activeOrders}</h3>
            </div>
            <ShoppingBag className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Alert</p>
              <h3 className="text-xl font-bold">{stats.lowStockItems}</h3>
            </div>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Section */}
      <section className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="text-red-500" size={20} />
          <h2 className="text-lg font-semibold">Low Stock Notifications</h2>
        </div>
        <div className="divide-y">
          {lowStockProducts.map(product => (
            <div key={product.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-sm">
                Only {product.stock} left
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Incoming Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map(order => (
                <tr key={order.id} className="text-sm">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 font-semibold">{order.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
