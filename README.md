# Balaji Krishi Seva Kendra - Full-Stack E-Commerce Web App

An AI-powered, modern, high-conversion web application for **Balaji Krishi Seva Kendra**, built using React, Tailwind CSS, and Supabase. This platform serves as a bridge between Rahul Patidar (the vendor) and local farmers, providing a seamless experience for purchasing seeds, fertilizers, and agricultural machinery.

## 🌿 Agri-Tech Features

### 👨‍🌾 Customer Module
- **Product Gallery**: Browse high-quality agricultural products by category (Seeds, Pesticides, Fertilizers, Machinery).
- **Smart Filters**: Filter by **Brand** or **Crop Type** (Soyabean, Cotton, Wheat, etc.) to find exactly what your farm needs.
- **Shopping Cart**: Easy add-to-cart functionality with quantity adjustments.
- **User Profile**: Securely save your address and view your complete "My Orders" history.
- **UPI Payment**: Integrated "Pay via UPI" with dynamic QR code generation and deep-linking to PhonePe, GPay, and Paytm.
- **WhatsApp Support**: Floating "Chat with Rahul Patidar" button for direct expert advice.

### 🏪 Vendor (Dukan Dar) Module
- **Dedicated Dashboard**: Real-time overview of sales, orders, and inventory status.
- **Inventory Management**: "Amazon Seller Central" style product management—add, edit, and delete products with image uploads.
- **Low Stock Alerts**: Automatic notifications when a product's stock falls below 5 units.
- **Incoming Orders**: Specialized view to manage and process customer orders efficiently.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS (Custom Agri-Tech Theme)
- **Icons**: Lucide-React
- **Backend/Auth**: Supabase
- **Animations**: Framer Motion
- **Testing**: Vitest & React Testing Library

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- A Supabase Project (for Database & Storage)

### Installation
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Driver-log-analyser # (Note: Branch name or project rename might apply)
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *Refer to `.env.example` for the template.*

4. **Start the development server**:
   ```bash
   npm start # (Shortcut for npm run dev)
   ```
   The app will be available at `http://localhost:5173`.

### 🧪 Running Tests
To run the test suite:
```bash
npm test
```

### 📦 Production Build
To create a production-ready build:
```bash
npm run build
```

## 📋 Database Schema Recommendation
For full functionality, set up the following tables in Supabase:
- `products`: id, name, category, crop_type, price, stock, image_url, description.
- `profiles`: id, full_name, role (vendor/customer), shop_name, address.
- `orders`: id, customer_id, items (JSONB), total_amount, status, created_at.

---
**Developed for Rahul Patidar | Balaji Krishi Seva Kendra**
*Innovating agriculture through technology.*
