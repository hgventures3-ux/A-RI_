import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Thank You | AÉRI Makhana',
  description: 'Thank you for your message. We will reply within 1 business day.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 text-[#1C1C1C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-[#1C1C1C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">
            Thank you.
          </h1>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            We will reply within 1 business day.
          </p>

          <div className="p-4 bg-[#F5F3F0] rounded-xl text-xs text-gray-600 mb-8 space-y-1">
            <p className="font-semibold text-[#1C1C1C]">Direct Inquiries</p>
            <p>Export inquiries: kriya@aerisnacks.com</p>
            <p>Distributors: info@aerisnacks.com</p>
            <p>WhatsApp: +91 94997 29424</p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-full min-h-[44px] bg-[#1C1C1C] text-white rounded-lg font-medium hover:bg-black transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
