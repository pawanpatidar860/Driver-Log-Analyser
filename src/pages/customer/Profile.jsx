import React, { useState } from 'react';
import { User, MapPin, Package, Settings, LogOut, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Balaji Farmer',
    email: 'farmer@example.com',
    phone: '+91 98765 43210',
    address: 'H.No 123, Krishi Marg, Village-Agri, Dist-Indore, MP - 452001'
  });

  const orders = [
    { id: 'ORD-125', date: 'Mar 28, 2024', total: '₹3,200', status: 'Delivered', items: 2 },
    { id: 'ORD-128', date: 'Apr 02, 2024', total: '₹8,500', status: 'Processing', items: 3 }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-8">
      {/* User Header */}
      <div className="bg-agri-green text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white border-2 border-white/50 backdrop-blur-md">
          <User size={48} />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-black">{user.name}</h1>
          <p className="text-white/80 font-medium">{user.phone} • {user.email}</p>
        </div>
        <button className="absolute top-4 right-4 text-white/50 hover:text-white transition p-2">
          <Settings size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
        {/* Order History */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-agri-green" /> My Order History
          </h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between hover:border-agri-green/30 transition group">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="font-black text-gray-900">{order.id}</p>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{order.date} • {order.items} Items</p>
                  <p className="text-xl font-black text-agri-green">{order.total}</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-agri-green transition translate-x-0 group-hover:translate-x-2" />
              </div>
            ))}
          </div>
        </section>

        {/* Saved Address */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-agri-green" /> Saved Address
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
            <p className="text-gray-600 font-medium leading-relaxed">{user.address}</p>
            <button className="text-agri-green font-bold text-sm hover:underline flex items-center gap-1">
              Edit Address <ChevronRight size={16} />
            </button>
          </div>

          <div className="pt-8">
            <button className="w-full flex items-center justify-center gap-2 text-red-500 font-bold p-4 rounded-xl hover:bg-red-50 transition border border-red-100">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
