"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const pages: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  "return-policy": {
    title: "Return Policy",
    sections: [
      { heading: "Overview", body: "At AÉRI, your satisfaction is our top priority. We stand behind the quality of every product we sell. This Return Policy outlines the terms under which you may request a return, exchange, or refund for products purchased through our official website or authorized retail partners." },
      { heading: "Eligibility for Returns", body: "Due to the perishable nature of our food products, returns are only accepted under the following circumstances: (a) the product was damaged during shipping, (b) the product received is incorrect or different from what was ordered, (c) the product shows signs of tampering or compromised packaging upon delivery, or (d) the product has expired before the stated 'best before' date. To be eligible for a return, you must contact us within 7 calendar days of receiving your order. All claims must be accompanied by photographic evidence of the issue (damaged packaging, incorrect product, etc.)." },
      { heading: "Non-Returnable Items", body: "We cannot accept returns for: products that have been opened and partially consumed (unless a quality defect is evident), products purchased more than 7 days ago, products that have been improperly stored (exposed to heat, moisture, or direct sunlight), or products purchased from unauthorized third-party sellers. Gift cards and promotional items are non-refundable." },
      { heading: "Refund Process", body: "Once we receive and verify your return claim, we will process your refund within 5-10 business days. Refunds are issued to the original payment method used at checkout. For credit card payments, please allow an additional 5-7 business days for the refund to appear on your statement. Shipping costs are non-refundable unless the return is due to our error (wrong item shipped, manufacturing defect, etc.). For returns due to shipping damage, we will either send a replacement at no additional cost or issue a full refund including original shipping charges." },
      { heading: "Exchange Policy", body: "If you would like to exchange a product for a different flavor or size, please contact our customer support team. Exchanges are subject to product availability. If the replacement product is of a higher value, you will be charged the difference. If it is of a lower value, the difference will be refunded to your original payment method." },
      { heading: "How to Initiate a Return", body: "To initiate a return, please email us at returns@aeri-snack.com with your order number, a description of the issue, and photographic evidence. Our customer service team will respond within 24 business hours with instructions on how to proceed. Please do not ship any product back without first receiving a Return Authorization (RA) number from our team." },
      { heading: "International Orders", body: "For orders shipped outside of France, return shipping costs are the responsibility of the customer unless the return is due to an error on our part. International refunds may take up to 15 business days to process due to cross-border banking procedures." },
    ]
  },
  "t-c": {
    title: "Terms & Conditions",
    sections: [
      { heading: "1. Acceptance of Terms", body: "By accessing, browsing, or using the AÉRI website (www.aeri-snack.com) and any associated services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services. These terms apply to all visitors, users, and others who access or use our platform." },
      { heading: "2. Intellectual Property", body: "All content on this website — including but not limited to text, graphics, logos, icons, images, audio clips, video clips, digital downloads, data compilations, and software — is the property of H&G Ventures Private Limited (operating as AÉRI) or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws. The AÉRI name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of H&G Ventures Private Limited. You may not use these marks without our prior written permission. No right, title, or interest in any content is transferred to you as a result of your use of this website." },
      { heading: "3. User Accounts", body: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of these Terms. You are responsible for safeguarding the password that you use to access our services and for any activities or actions under your password. You agree not to disclose your password to any third party and to notify us immediately upon becoming aware of any breach of security or unauthorized use of your account." },
      { heading: "4. Product Information & Pricing", body: "We strive to display our products and their descriptions as accurately as possible. However, we do not guarantee that product descriptions, colors, or other content on the website are accurate, complete, reliable, current, or error-free. All prices are listed in Euros (€) and include applicable VAT unless otherwise stated. We reserve the right to modify prices at any time without prior notice. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price." },
      { heading: "5. Orders & Payment", body: "By placing an order through our website, you are making an offer to purchase our products subject to these Terms. All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity. Payment is processed at the time of order through our secure payment gateway. We accept major credit cards, debit cards, and other payment methods as displayed at checkout." },
      { heading: "6. Shipping & Delivery", body: "Shipping timelines are estimates and not guarantees. Standard delivery within France is 3-5 business days. Express delivery is 1-2 business days. International shipping timelines vary by destination. We are not responsible for delays caused by customs, postal services, or events beyond our control. Risk of loss and title for items pass to you upon delivery of the items to the carrier." },
      { heading: "7. Limitation of Liability", body: "To the maximum extent permitted by applicable law, AÉRI and its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from: (a) your access to or use of or inability to access or use our services; (b) any conduct or content of any third party on our services; (c) any content obtained from our services; and (d) unauthorized access, use, or alteration of your transmissions or content." },
      { heading: "8. Governing Law", body: "These Terms shall be governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of Paris, France. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights." },
      { heading: "9. Changes to Terms", body: "We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be communicated via email or a prominent notice on our website at least 30 days prior to the changes taking effect. Your continued use of our website after any changes constitutes acceptance of the new Terms." },
    ]
  },
  "legal-notice": {
    title: "Legal Notice",
    sections: [
      { heading: "Company Information", body: "AÉRI is a registered trademark and brand operated by H&G Ventures Private Limited, a company incorporated under the laws of India. Registered Office: Bihar, India. European Operations: 75008 Paris, France. Company Registration Number: Available upon request. FSSAI License Number: Available upon request. IEC (Import Export Code): Registered and active." },
      { heading: "Publication Director", body: "The publication director (Directeur de la publication) for the website www.aeri-snack.com is the Managing Director of H&G Ventures Private Limited. For editorial inquiries, please contact: editorial@aeri-snack.com." },
      { heading: "Website Hosting", body: "This website is hosted on Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States. The hosting infrastructure complies with GDPR requirements for data processing and storage. All data transmitted between your browser and our servers is encrypted using TLS 1.3 protocol." },
      { heading: "Intellectual Property Rights", body: "The entire content of this website — including text, images, graphics, logos, icons, photographs, videos, audio, software, and code — is the exclusive property of H&G Ventures Private Limited unless otherwise stated. Any reproduction, representation, modification, publication, adaptation, or exploitation of all or part of this content, by any means, without the prior written authorization of H&G Ventures Private Limited, is strictly prohibited and constitutes copyright infringement punishable under Articles L.335-2 and following of the French Intellectual Property Code." },
      { heading: "Personal Data Protection", body: "In accordance with the General Data Protection Regulation (GDPR - EU 2016/679) and the French Data Protection Act (Loi Informatique et Libertés), you have the right to access, rectify, erase, restrict processing, and port your personal data. You also have the right to object to the processing of your personal data. To exercise these rights, please contact our Data Protection Officer at: privacy@aeri-snack.com. For more information, please refer to our Privacy Policy." },
      { heading: "Cookies", body: "This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use this website, you consent to our use of cookies in accordance with our Cookie Policy. You can manage your cookie preferences through your browser settings at any time. Essential cookies required for website functionality cannot be disabled." },
      { heading: "Hyperlinks", body: "This website may contain hyperlinks to third-party websites. H&G Ventures Private Limited has no control over the content of these external sites and accepts no responsibility for their content or practices. The inclusion of any hyperlink does not imply endorsement of the linked website by AÉRI." },
      { heading: "Applicable Law & Jurisdiction", body: "This legal notice is governed by French law. Any dispute relating to the use of this website shall be subject to the exclusive jurisdiction of the competent courts of Paris, France. This legal notice was last updated on May 19, 2026." },
    ]
  },
  "privacy": {
    title: "Privacy Policy",
    sections: [
      { heading: "1. Introduction", body: "H&G Ventures Private Limited, operating under the brand name AÉRI ('we', 'our', 'us'), is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website (www.aeri-snack.com), make a purchase, subscribe to our newsletter, or interact with us in any way. This policy complies with the General Data Protection Regulation (GDPR - EU 2016/679) and the French Data Protection Act (Loi Informatique et Libertés)." },
      { heading: "2. Data Controller", body: "The data controller responsible for your personal data is: H&G Ventures Private Limited, operating as AÉRI. European Office: 75008 Paris, France. Email: privacy@aeri-snack.com. If you have any questions about how we handle your data, you may contact our Data Protection Officer at the email address above." },
      { heading: "3. Information We Collect", body: "We collect information you provide directly to us, including: your name, email address, postal address, and phone number when you create an account or place an order; payment information (processed securely through our payment provider — we do not store credit card numbers); order history and product preferences; communications you send to us (emails, contact form submissions, customer support inquiries); and newsletter subscription preferences. We also automatically collect certain technical information when you visit our website, including: IP address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, and cookie data." },
      { heading: "4. How We Use Your Information", body: "We use your personal data for the following purposes: (a) to process and fulfill your orders, including shipping and payment processing; (b) to communicate with you about your orders, account, and customer support inquiries; (c) to send you marketing communications (only with your explicit consent), including newsletters, product launches, and promotional offers; (d) to personalize your experience on our website and recommend products; (e) to analyze website usage and improve our services; (f) to comply with legal obligations, including tax and accounting requirements; and (g) to prevent fraud and protect the security of our platform." },
      { heading: "5. Data Sharing", body: "We do not sell your personal data to third parties. We may share your information with: (a) service providers who assist us in operating our business (payment processors, shipping companies, email service providers) — these providers are contractually bound to protect your data; (b) legal authorities when required by law, court order, or regulatory obligation; and (c) professional advisors (lawyers, accountants, auditors) as necessary for business operations. All third-party service providers are GDPR-compliant and process data only on our instructions." },
      { heading: "6. Data Retention", body: "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected: account information is retained for the duration of your account plus 3 years after closure; order and transaction data is retained for 10 years as required by French tax law; marketing preferences are retained until you withdraw consent; and website analytics data is anonymized after 26 months." },
      { heading: "7. Your Rights", body: "Under GDPR, you have the following rights: Right of Access — you can request a copy of all personal data we hold about you; Right to Rectification — you can request correction of inaccurate data; Right to Erasure — you can request deletion of your data (subject to legal retention requirements); Right to Restrict Processing — you can request that we limit how we use your data; Right to Data Portability — you can request your data in a structured, machine-readable format; Right to Object — you can object to processing based on legitimate interests or for direct marketing; and Right to Withdraw Consent — you can withdraw consent for marketing communications at any time. To exercise any of these rights, please contact us at privacy@aeri-snack.com. We will respond within 30 days." },
      { heading: "8. Security", body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include: TLS 1.3 encryption for all data in transit, encrypted storage for sensitive data at rest, regular security audits and vulnerability assessments, strict access controls and employee training, and incident response procedures for potential data breaches. In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and the relevant supervisory authority within 72 hours as required by GDPR." },
      { heading: "9. Contact & Complaints", body: "If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us at: privacy@aeri-snack.com. If you are not satisfied with our response, you have the right to lodge a complaint with the CNIL (Commission Nationale de l'Informatique et des Libertés), the French data protection authority: www.cnil.fr. This Privacy Policy was last updated on May 19, 2026, and may be revised periodically." },
    ]
  },
};

export default function LegalDynamicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const page = pages[slug];

  if (!page) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Link href="/" className="text-[#6E6E73] hover:text-[#111111] underline">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#111111] font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 bg-white/80 backdrop-blur-md border-b border-[#111111]/5">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/"><h2 className="text-xl tracking-widest uppercase font-semibold cursor-pointer">AÉRI</h2></Link>
        </motion.div>
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#111111]/70">
          <Link href="/brand" className="hover:text-[#111111] transition-colors">The Brand</Link>
          <Link href="/products" className="hover:text-[#111111] transition-colors">Products</Link>
          <Link href="/contact" className="hover:text-[#111111] transition-colors">Contact</Link>
        </motion.nav>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#6E6E73] mb-5">
          <span className="w-6 h-[1px] bg-[#6E6E73]/40" />Legal<span className="w-6 h-[1px] bg-[#6E6E73]/40" />
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{page.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-sm text-[#6E6E73]">Last updated: May 19, 2026</motion.p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <div className="bg-white rounded-3xl shadow-sm border border-[#111111]/5 overflow-hidden">
          {page.sections.map((sec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className={`p-8 md:p-12 ${i > 0 ? "border-t border-[#111111]/5" : ""}`}>
              <h2 className="text-xl font-bold mb-3">{sec.heading}</h2>
              <p className="text-[#111111]/65 leading-[1.9] text-[15px]">{sec.body}</p>
            </motion.div>
          ))}
          <div className="p-8 md:p-12 border-t border-[#111111]/5 bg-[#F5F5F7]">
            <p className="text-sm text-[#6E6E73]">If you have any questions about this document, please <Link href="/contact" className="text-[#111111] font-medium hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
