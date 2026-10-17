'use client';

import React from 'react';
import { event } from '@/lib/gtag';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    event('whatsapp_click', { location: 'floating_button' });
  };

  return (
    <a
      href="https://wa.me/919499729424?text=Hello%2C%20I%20am%20interested%20in%20Phool%20Makhana%20export."
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed z-40 bottom-16 md:bottom-6 right-4 md:right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.21 8.21 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.94-.19-.3A8.204 8.204 0 0 1 3.8 11.91c0-4.54 3.7-8.24 8.25-8.24m4.55 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8 1-.15.16-.29.18-.54.05-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.43-.57-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.16-.48-.28" />
      </svg>
    </a>
  );
}
