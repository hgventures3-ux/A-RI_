'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContactModal, ProductOption } from '@/context/ContactModalContext';
import { event } from '@/lib/gtag';

export default function ContactModal() {
  const { isOpen, closeModal, defaultProduct } = useContactModal();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState<ProductOption>(defaultProduct);
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Sync defaultProduct when modal opens or defaultProduct changes
  useEffect(() => {
    if (defaultProduct) {
      setProduct(defaultProduct);
    }
  }, [defaultProduct, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          company,
          country,
          email,
          phone,
          product,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback('Thank you. We will reply within 1 business day.');
        event('contact_form_sent', {
          product,
          country,
        });

        setTimeout(() => {
          closeModal();
          router.push('/thank-you');
        }, 800);
      } else {
        setFeedback(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFeedback('Failed to send request. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full h-full md:h-auto md:max-w-xl bg-white md:rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-screen">
        {/* Close X Button */}
        <button
          onClick={closeModal}
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xl font-bold"
        >
          &times;
        </button>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C1C] tracking-tight">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Tell us what you need. We reply within 1 business day.
          </p>

          {feedback && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
              {feedback}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Your country"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Product
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value as ProductOption)}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
              >
                <option value="Raw Phool Makhana">Raw Phool Makhana</option>
                <option value="Private Label: Raw">Private Label: Raw</option>
                <option value="Private Label: Roasted or Flavored">Private Label: Roasted or Flavored</option>
                <option value="AÉRI Brand (Distributor)">AÉRI Brand (Distributor)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your requirements, destination port, or questions"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] bg-[#1C1C1C] text-white font-medium rounded-lg hover:bg-black transition-colors flex items-center justify-center disabled:opacity-50 text-[16px]"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 text-center text-[11px] text-gray-500 space-y-1">
          <p>
            <a href="mailto:kriya@aerisnacks.com" className="hover:underline">kriya@aerisnacks.com (exports)</a>
            {' | '}
            <a href="mailto:info@aerisnacks.com" className="hover:underline">info@aerisnacks.com (distributors)</a>
          </p>
          <p>
            WhatsApp:{' '}
            <a
              href="https://wa.me/919499729424"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#1C1C1C] font-medium"
            >
              +91 94997 29424
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
