import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, Tag, Check, Star, ChevronDown } from 'lucide-react';

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCrop, setActiveCrop] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Seeds', 'Pesticides', 'Fertilizers', 'Machinery'];
  const cropTypes = ['All', 'Soyabean', 'Cotton', 'Wheat', 'Vegetables'];

  const products = [
    { id: 1, name: 'Soya Gold Seeds (5kg)', category: 'Seeds', crop: 'Soyabean', price: '₹1,200', rating: 4.8, reviews: 150, image: null },
    { id: 2, name: 'Cotton Power Seeds', category: 'Seeds', crop: 'Cotton', price: '₹850', rating: 4.5, reviews: 85, image: null },
    { id: 3, name: 'Urea Fertilizer (50kg)', category: 'Fertilizers', crop: 'All', price: '₹3,500', rating: 4.9, reviews: 320, image: null },
    { id: 4, name: 'Wheat Growth Booster', category: 'Pesticides', crop: 'Wheat', price: '₹450', rating: 4.2, reviews: 45, image: null },
    { id: 5, name: 'Sprayer Pump (16L)', category: 'Machinery', crop: 'All', price: '₹2,800', rating: 4.7, reviews: 95, image: null }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesCrop = activeCrop === 'All' || p.crop === activeCrop || p.crop === 'All';
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCrop && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for seeds, fertilizers, or tools..."
          className="w-full pl-12 pr-4 py-4 border-2 border-agri-green/20 rounded-2xl focus:ring-2 focus:ring-agri-green outline-none shadow-sm transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar Filters */}
        <div className="hidden md:block space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Tag size={20} className="text-agri-green" /> Categories
            </h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                    activeCategory === cat ? 'bg-agri-green text-white shadow-md' : 'text-gray-600 hover:bg-agri-light hover:text-agri-green'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Filter size={20} className="text-agri-green" /> Filter by Crop
            </h3>
            <div className="space-y-2">
              {cropTypes.map(crop => (
                <button
                  key={crop}
                  onClick={() => setActiveCrop(crop)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                    activeCrop === crop ? 'bg-agri-green text-white shadow-md' : 'text-gray-600 hover:bg-agri-light hover:text-agri-green'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Tabs */}
        <div className="md:hidden flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border-2 transition font-semibold text-sm ${
                activeCategory === cat ? 'bg-agri-green text-white border-agri-green' : 'border-gray-200 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-medium">Showing {filteredProducts.length} items</p>
            <button className="flex items-center gap-1 text-agri-green font-bold text-sm">
              Sort by: Recommended <ChevronDown size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-square bg-agri-light relative overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-agri-green/30 group-hover:scale-110 transition duration-500">
                    <ShoppingCart size={64} />
                  </div>
                  {product.stock < 5 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-lg">
                      Low Stock
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-agri-green uppercase tracking-wider">{product.category}</p>
                    <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-agri-green transition">{product.name}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-2xl font-black text-gray-900">{product.price}</p>
                    <button className="bg-agri-green text-white p-3 rounded-xl shadow-lg shadow-agri-green/20 hover:scale-110 transition active:scale-95">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
