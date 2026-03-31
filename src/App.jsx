import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, User, LayoutDashboard, Package, Menu, X, Leaf, MessageCircle } from 'lucide-react';

// Pages
import Dashboard from './pages/vendor/Dashboard';
import Inventory from './pages/vendor/Inventory';
import ProductGallery from './pages/customer/ProductGallery';
import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';

// Components
import WhatsAppButton from './components/WhatsAppButton';
import UPIPayment from './components/UPIPayment';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isVendorRoute = location.pathname.startsWith('/vendor');

  const navItems = isVendorRoute
    ? [
        { name: 'Dashboard', path: '/vendor/dashboard', icon: LayoutDashboard },
        { name: 'Inventory', path: '/vendor/inventory', icon: Package },
        { name: 'Customer View', path: '/', icon: Home },
      ]
    : [
        { name: 'Products', path: '/', icon: Home },
        { name: 'Cart', path: '/cart', icon: ShoppingCart },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Vendor Portal', path: '/vendor/dashboard', icon: LayoutDashboard },
      ];

  return (
    <nav className="bg-agri-green text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white p-2 rounded-xl group-hover:scale-110 transition shadow-lg">
              <Leaf className="text-agri-green" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-none">BALAJI KRISHI</span>
              <span className="text-[10px] font-bold text-white/70 tracking-widest">SEVA KENDRA</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                  location.pathname === item.path ? 'bg-white text-agri-green shadow-lg scale-105' : 'hover:bg-white/10 hover:translate-y-[-2px]'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl bg-white/10 border border-white/20 transition active:scale-90">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-agri-green/95 backdrop-blur-xl border-t border-white/10 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 p-4 rounded-2xl font-black text-lg transition ${
                location.pathname === item.path ? 'bg-white text-agri-green shadow-xl' : 'hover:bg-white/10'
              }`}
            >
              <item.icon size={24} />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-agri-light flex flex-col font-sans selection:bg-agri-green/20">
        <Navbar />

        <main className="flex-grow max-w-7xl mx-auto w-full">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<ProductGallery />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<UPIPayment />} />

            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<Dashboard />} />
            <Route path="/vendor/inventory" element={<Inventory />} />
          </Routes>
        </main>

        <footer className="bg-white border-t p-8 text-center mt-12">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">© 2024 Balaji Krishi Seva Kendra • Powered by Agri-Tech Solutions</p>
        </footer>

        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;
