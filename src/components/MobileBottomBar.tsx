'use client';

import React from 'react';
import { useContactModal } from '@/context/ContactModalContext';
import { event } from '@/lib/gtag';

export default function MobileBottomBar() {
  const { openModal } = useContactModal();

  const handleWhatsApp = () => {
    event('whatsapp_click', { location: 'mobile_bottom_bar' });
  };

  const handleCall = () => {
    event('phone_click', { location: 'mobile_bottom_bar' });
  };

  const handleContact = () => {
    openModal();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5] border-t border-gray-300 px-3 py-2 shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919499729424?text=Hello%20A%C3%89RI%20Team%2C%20I%27m%20interested%20in%20your%20products%20and%20would%20like%20to%20know%20more.%20Could%20you%20please%20assist%20me%3F"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex items-center justify-center min-h-[44px] bg-[#25D366] text-white rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-transform"
        >
          WhatsApp
        </a>

        {/* Call Button */}
        <a
          href="tel:+918460058916"
          onClick={handleCall}
          className="flex items-center justify-center min-h-[44px] bg-white border border-gray-300 text-[#1C1C1C] rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-transform"
        >
          Call
        </a>

        {/* Contact Us Button */}
        <button
          onClick={handleContact}
          type="button"
          className="flex items-center justify-center min-h-[44px] bg-[#1C1C1C] text-white rounded-lg text-sm font-semibold shadow-sm active:scale-95 transition-transform"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
