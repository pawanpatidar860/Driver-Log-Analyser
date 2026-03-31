import React, { useState } from 'react';
import { CreditCard, QrCode, Phone, Smartphone, ChevronRight, CheckCircle, Info } from 'lucide-react';

const UPIPayment = ({ amount = '1,250' }) => {
  const [method, setMethod] = useState('Deep Link');
  const [status, setStatus] = useState('Pending');

  const upiId = 'rahulpatidar@upi'; // Replace with real UPI ID
  const shopName = 'Balaji Krishi Seva Kendra';
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName)}&am=${amount}&cu=INR&tn=Order_from_BK_App`;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg mx-auto space-y-6 border border-agri-green/10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Pay for Order</h2>
        <p className="text-4xl font-black text-agri-green">₹{amount}</p>
      </div>

      <div className="flex bg-agri-light p-2 rounded-2xl gap-2 shadow-inner">
        <button
          onClick={() => setMethod('Deep Link')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
            method === 'Deep Link' ? 'bg-white text-agri-green shadow-lg scale-100' : 'text-gray-500 hover:text-agri-green hover:scale-[1.02]'
          }`}
        >
          <Smartphone size={18} /> Pay via App
        </button>
        <button
          onClick={() => setMethod('QR Code')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
            method === 'QR Code' ? 'bg-white text-agri-green shadow-lg scale-100' : 'text-gray-500 hover:text-agri-green hover:scale-[1.02]'
          }`}
        >
          <QrCode size={18} /> QR Code
        </button>
      </div>

      <div className="p-6 bg-agri-light/30 rounded-2xl border-2 border-dashed border-agri-green/10 flex flex-col items-center justify-center min-h-[300px]">
        {method === 'Deep Link' ? (
          <div className="space-y-6 w-full">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Select Payment App</p>
            <div className="grid grid-cols-2 gap-4">
              {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(app => (
                <a
                  key={app}
                  href={upiUrl}
                  className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2 hover:border-agri-green hover:shadow-lg transition active:scale-95 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-agri-light rounded-xl flex items-center justify-center text-agri-green group-hover:scale-110 transition">
                    <Smartphone size={24} />
                  </div>
                  <span className="font-bold text-sm text-gray-800">{app}</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl inline-block border-4 border-agri-green relative overflow-hidden group">
              <QrCode size={180} className="text-gray-900 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <Info className="text-agri-green animate-pulse" size={48} />
              </div>
            </div>
            <p className="text-sm font-bold text-gray-600">Scan this QR Code with any UPI App</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl text-green-700 border border-green-100">
          <CheckCircle size={20} className="shrink-0" />
          <p className="text-xs font-bold leading-tight">Your payment is 100% secure. Funds will be transferred directly to Rahul Patidar's business account.</p>
        </div>
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
          <span className="flex items-center gap-1"><Smartphone size={12} /> SSL SECURE</span>
          <span className="flex items-center gap-1"><CreditCard size={12} /> UPI ENABLED</span>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;
