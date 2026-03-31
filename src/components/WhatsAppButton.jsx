import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+919876543210'; // Replace with Rahul Patidar's real number
  const message = 'Hello Rahul Patidar, I am interested in products from Balaji Krishi Seva Kendra.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 flex items-center gap-2 group"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm">
        Chat with Rahul Patidar
      </span>
    </a>
  );
};

export default WhatsAppButton;
