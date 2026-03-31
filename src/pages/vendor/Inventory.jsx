import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package, Image as ImageIcon, X } from 'lucide-react';

const Inventory = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Soya Gold Seeds (5kg)', category: 'Seeds', price: '₹1,200', stock: 45, image: null },
    { id: 2, name: 'Power Fertilizer (25kg)', category: 'Fertilizers', price: '₹3,500', stock: 20, image: null },
    { id: 3, name: 'Neem Oil Spray (1L)', category: 'Pesticides', price: '₹450', stock: 15, image: null }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-agri-green">Inventory Management</h1>
        <button
          onClick={() => { setCurrentProduct(null); setIsModalOpen(true); }}
          className="flex items-center justify-center space-x-2 bg-agri-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition shadow-md"
        >
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products by name or category..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-agri-green outline-none"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-agri-green outline-none bg-white">
          <option>All Categories</option>
          <option>Seeds</option>
          <option>Pesticides</option>
          <option>Fertilizers</option>
          <option>Machinery</option>
        </select>
      </div>

      {/* Inventory Table (Amazon Seller Style) */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <ImageIcon className="text-gray-400" size={24} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">ID: {product.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-agri-light text-agri-green text-xs font-semibold rounded-full border border-agri-green">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-agri-green">{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${product.stock < 5 ? 'text-red-600' : 'text-gray-700'}`}>
                        {product.stock}
                      </span>
                      {product.stock < 5 && (
                        <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold uppercase">Low</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-agri-green text-white">
              <h3 className="text-lg font-bold">{currentProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" defaultValue={currentProduct?.name} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select defaultValue={currentProduct?.category} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none bg-white">
                      <option>Seeds</option>
                      <option>Pesticides</option>
                      <option>Fertilizers</option>
                      <option>Machinery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input type="text" defaultValue={currentProduct?.price} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
                  <input type="number" defaultValue={currentProduct?.stock} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-agri-green transition cursor-pointer">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-sm">Click to upload image</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="button" className="px-6 py-2 bg-agri-green text-white rounded-lg font-bold shadow-lg">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
