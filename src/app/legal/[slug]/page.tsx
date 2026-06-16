"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COMPANY = "H&G Ventures Private Limited (trading as AERI Makhana)";
const REG_ADDRESS = "TF-302, Shanti Heights, Jawahar Nagar, Halol-389350, Gujarat, India";
const OFFICE_ADDRESS = "1602/E GIDC, Nr. Safari Chowkdi, Halol-389350, Gujarat, India";
const GST = "24AAICH6172R1ZX";
const EMAIL = "kriya@aerisnacks.com";
const PHONE = "+91 84600 58916 / +33 7 45 69 37 74";
const WEBSITE = "aerisnacks.com";
const DIRECTOR = "Kriya Kanunga";

const pages: Record<string, { title: string; lastUpdated?: string; sections: { heading: string; body: string }[] }> = {
  /* ─────────────────── MENTIONS LÉGALES ─────────────────── */
  "mentions-legales": {
    title: "Mentions Légales",
    lastUpdated: "June 2026",
    sections: [
      {
        heading: "1. Éditeur du Site",
        body: `Le site ${WEBSITE} est édité par ${COMPANY}. Siège social enregistré : ${REG_ADDRESS}, Inde. Adresse opérationnelle : ${OFFICE_ADDRESS}. Pays d'incorporation : Inde. Numéro GST/GSTIN : ${GST}. IEC (Code Import Export) : Enregistré et actif. APEDA RCMC : Enregistré. E-mail : ${EMAIL}. Téléphone : ${PHONE}.`
      },
      {
        heading: "2. Directeur de la Publication",
        body: `Le directeur de la publication du site ${WEBSITE} est ${DIRECTOR}, Fondatrice. Contact : ${EMAIL}.`
      },
      {
        heading: "3. Hébergement",
        body: `Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. L'infrastructure d'hébergement est conforme aux exigences du RGPD. Toutes les données transmises entre votre navigateur et nos serveurs sont chiffrées via le protocole TLS.`
      },
      {
        heading: "4. Propriété Intellectuelle",
        body: `L'ensemble du contenu du site ${WEBSITE} — y compris la marque AERI, AERI Makhana, les logos, les images de produits, les designs d'emballage, les textes, les graphismes et l'aspect général du site — est la propriété intellectuelle exclusive de ${COMPANY} et est protégé par le droit indien de la propriété intellectuelle et les conventions internationales. Toute reproduction, distribution, modification ou exploitation commerciale de tout contenu de ce site sans le consentement écrit préalable d'AERI Makhana est strictement interdite.`
      },
      {
        heading: "5. Données Personnelles & Cookies",
        body: `Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles. Pour exercer ces droits : ${EMAIL}. Pour toute réclamation : CNIL — www.cnil.fr.`
      },
      {
        heading: "6. Droit Applicable",
        body: `Les présentes mentions légales sont régies par le droit français. Tout litige sera soumis à la compétence des tribunaux compétents. Mis à jour : Juin 2026.`
      },
    ]
  },

  /* ─────────────────── LEGAL NOTICE (EN) ─────────────────── */
  "legal-notice": {
    title: "Legal Notice",
    lastUpdated: "June 2026",
    sections: [
      {
        heading: "1. Website Publisher",
        body: `This website (${WEBSITE}) is published by ${COMPANY}. Registered Address: ${REG_ADDRESS}, India. Operational Address: ${OFFICE_ADDRESS}. Country of Incorporation: India. GST Number: ${GST}. IEC (Import Export Code): Registered and active. APEDA RCMC: Registered. Email: ${EMAIL}. Phone: ${PHONE}.`
      },
      {
        heading: "2. Publication Director",
        body: `Publication Director: ${DIRECTOR}, Founder. Contact: ${EMAIL}.`
      },
      {
        heading: "3. Website Host",
        body: `This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States. The hosting infrastructure complies with GDPR requirements. All data transmitted is encrypted via TLS.`
      },
      {
        heading: "4. Intellectual Property",
        body: `All content on ${WEBSITE} — including but not limited to the brand names AERI, AERI Makhana, logos, product images, packaging designs, text, graphics, and overall look and feel — is the exclusive intellectual property of ${COMPANY} and is protected under applicable Indian intellectual property law and international conventions. Any reproduction, distribution, modification, or commercial exploitation without prior written consent is strictly prohibited.`
      },
    ]
  },

  /* ─────────────────── CGV / TERMS & CONDITIONS (FR B2C) ─────────────────── */
  "cgv": {
    title: "Conditions Générales de Vente",
    lastUpdated: "June 2026",
    sections: [
      { heading: "1. Définitions", body: `"Société", "Nous" désigne ${COMPANY}. "Site" désigne ${WEBSITE}. "Client" désigne toute personne passant une commande. "Produits" désigne tous les produits AERI Makhana listés à la vente. "Commande" désigne une demande d'achat soumise via le site.` },
      { heading: "2. Acceptation des Conditions", body: `En accédant à ce site et en passant une commande, vous confirmez avoir lu, compris et accepté l'intégralité des présentes Conditions Générales de Vente. Nous nous réservons le droit de les mettre à jour à tout moment. La version applicable à votre commande est celle publiée à la date de confirmation de votre commande.` },
      { heading: "3. Produits & Disponibilité", body: `Tous les produits sont soumis à disponibilité. Nous nous réservons le droit de limiter les quantités ou d'arrêter tout produit sans préavis. Les images des produits sont à titre illustratif. Les valeurs nutritionnelles affichées sont approximatives et basées sur des analyses de laboratoire.` },
      { heading: "4. Prix", body: `Tous les prix sont affichés en Euros (EUR) et incluent la TVA française applicable. Les prix n'incluent pas les frais de livraison, affichés séparément au moment du paiement. La livraison est gratuite pour toute commande supérieure à 39,99 €. Nous nous réservons le droit de modifier les prix à tout moment.` },
      { heading: "5. Processus de Commande", body: `Les commandes sont passées via notre site selon un processus de double confirmation ('cliquer et double-cliquer') conformément à l'Article L.221-14 du Code de la Consommation. Étape 1 : Vérifiez votre panier, confirmez les articles, quantités et adresse de livraison. Étape 2 : Confirmez votre commande en cliquant sur le bouton final. Un e-mail de confirmation vous sera envoyé sous 24 heures après paiement.` },
      { heading: "6. Paiement", body: `Nous acceptons les méthodes de paiement suivantes : PayPal et autres méthodes affichées au paiement. Tous les paiements sont traités via des processeurs sécurisés PCI-DSS. Nous ne stockons pas vos coordonnées bancaires. Le paiement est débité au moment de la passation de la commande.` },
      { heading: "7. Livraison", body: `Nous livrons dans le monde entier. Une notification automatique vous sera affichée avant le paiement si nous ne livrons pas encore dans votre région. Les délais de livraison sont estimatifs. Les frais de livraison sont calculés au paiement. La livraison est gratuite au-dessus de 39,99 €. La première commande bénéficie de la livraison gratuite. Les colis expédiés depuis l'Inde peuvent être soumis au contrôle douanier.` },
      { heading: "8. Droit de Rétractation (Article L.221-18)", body: `Vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation sans motif. Pour exercer ce droit, contactez-nous à ${EMAIL} avec votre nom, numéro de commande et déclaration de rétractation. À compter du 19 juin 2026 : utilisez le bouton 'Rétractation' sur la page de votre compte ou dans l'e-mail de confirmation. Le droit de rétractation ne s'applique pas aux produits alimentaires périssables ouverts.` },
      { heading: "9. Produits Défectueux & Garantie Légale", body: `Tous nos produits sont soumis à la garantie légale de conformité (Articles L.217-4 à L.217-14 du Code de la Consommation). Si vous recevez un produit défectueux, endommagé ou non conforme, contactez-nous dans les 48h à ${EMAIL} avec photos à l'appui. Nous organiserons un remplacement ou un remboursement complet sans frais.` },
      { heading: "10. Limitation de Responsabilité", body: `Dans la limite permise par la loi applicable, ${COMPANY} ne sera pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs. Notre responsabilité totale ne dépassera pas la valeur totale de la commande concernée.` },
      { heading: "11. Droit Applicable & Règlement des Litiges", body: `Ces CGV sont régies par le droit français de protection des consommateurs. En cas de litige, contactez-nous d'abord à ${EMAIL}. Plateforme de règlement en ligne des litiges (UE) : https://ec.europa.eu/consumers/odr/. Autorité française : DGCCRF — www.economie.gouv.fr/dgccrf.` },
    ]
  },

  /* ─────────────────── T&C (EN) ─────────────────── */
  "t-c": {
    title: "Terms & Conditions",
    lastUpdated: "June 2026",
    sections: [
      { heading: "1. Definitions", body: `"Company", "We", "Us" refers to ${COMPANY}. "Website" refers to ${WEBSITE}. "Customer", "You" refers to any individual placing an order. "Products" refers to all AERI Makhana branded products. "Order" refers to a purchase request submitted through the website.` },
      { heading: "2. Acceptance of Terms", body: `By accessing this website and placing an order, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. We reserve the right to update these Terms at any time. The version applicable to your order is the version published on the date your order is confirmed.` },
      { heading: "3. Products & Availability", body: `All products are subject to availability. Product images are for illustrative purposes. Nutritional values displayed are approximate and based on laboratory analysis. Always read the label on the physical product before consumption.` },
      { heading: "4. Pricing", body: `All prices are displayed in Euros (EUR) and include applicable VAT. Prices do not include shipping costs, which are displayed at checkout. Free shipping applies on orders above €39.99. Your first order qualifies for free shipping. We reserve the right to change prices at any time.` },
      { heading: "5. Order Process", body: `Orders are placed through our website via a two-step confirmation process as required by French law. Step 1: Review your cart, confirm items, quantities, and delivery address. Step 2: Confirm your order by clicking the final 'Place Order' button. An order confirmation email will be sent within 24 hours of successful payment.` },
      { heading: "6. Payment", body: `We accept: PayPal and other payment methods displayed at checkout. All payments are processed through secure, PCI-DSS compliant payment processors. We do not store your card details. Payment is taken in full at the time of order placement.` },
      { heading: "7. Shipping & Delivery", body: `We ship globally. An automated notification will be displayed before payment if we do not yet deliver to your specific region. Delivery times are estimates. Shipping costs are calculated at checkout. Orders above €39.99 qualify for free shipping. Your first order ships free. Orders are dispatched from India and may be subject to customs inspection.` },
      { heading: "8. Right of Withdrawal", body: `You have the right to withdraw from your purchase without reason within 14 days of receiving your order. To exercise this right: contact us at ${EMAIL} with your name, order number, and statement of withdrawal. From 19 June 2026: use the 'Withdrawal' button on your account page or order confirmation email. The right of withdrawal does not apply to opened perishable food products.` },
      { heading: "9. Defective Products & Legal Guarantee", body: `If you receive a defective, damaged, or incorrect product, contact us within 48 hours at ${EMAIL} with photographic evidence. We will arrange a replacement or full refund at no cost to you.` },
      { heading: "10. Governing Law & Dispute Resolution", body: `These Terms are governed by French consumer protection law for consumers residing in France, Belgium, and Luxembourg. For matters not covered by mandatory French consumer law, the laws of India additionally apply. EU Online Dispute Resolution: https://ec.europa.eu/consumers/odr/. Email for ODR: ${EMAIL}.` },
    ]
  },

  /* ─────────────────── POLITIQUE DE CONFIDENTIALITÉ ─────────────────── */
  "confidentialite": {
    title: "Politique de Confidentialité",
    lastUpdated: "June 2026",
    sections: [
      { heading: "1. Responsable du Traitement", body: `Le responsable du traitement de vos données personnelles est : ${COMPANY}, ${REG_ADDRESS}, Inde. E-mail : ${EMAIL}.` },
      { heading: "2. Données Collectées", body: `Nous collectons : données d'identité (nom, prénom), données de contact (e-mail, téléphone, adresse), données de transaction (historique des commandes, montants), données techniques (adresse IP, type de navigateur, cookies), préférences marketing, communications.` },
      { heading: "3. Base Légale du Traitement (Art. 6 RGPD)", body: `Nous traitons vos données sur les bases légales suivantes : Exécution d'un contrat (traitement des commandes) ; Obligation légale (fiscalité, comptabilité) ; Intérêts légitimes (amélioration du site, prévention fraude) ; Consentement (e-mails marketing, cookies non essentiels — retirable à tout moment).` },
      { heading: "4. Utilisation des Données", body: `Nous utilisons vos données pour : traiter et exécuter vos commandes ; envoyer confirmations, mises à jour de livraison et reçus ; répondre à vos demandes ; envoyer des communications marketing (consentement requis) ; améliorer notre site via analytics ; respecter nos obligations légales ; prévenir la fraude.` },
      { heading: "5. Partage des Données", body: `Nous ne vendons pas vos données. Nous les partageons avec : processeurs de paiement (PayPal) ; prestataires logistiques ; fournisseurs d'e-mail ; fournisseurs d'analytics (Google Analytics) ; autorités légales si requis. Tous les prestataires sont contractuellement liés par le RGPD.` },
      { heading: "6. Transferts Internationaux", body: `${COMPANY} étant basée en Inde, vos données peuvent être transférées et traitées en Inde. Nous protégeons ces transferts via des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne. Vous pouvez demander une copie des garanties à ${EMAIL}.` },
      { heading: "7. Conservation des Données", body: `Données de commande : 10 ans (loi comptable française) ; Données de compte client : 3 ans après la dernière activité ; Consentement marketing : jusqu'au retrait + 3 ans ; Données cookies : 13 mois maximum (recommandation CNIL).` },
      { heading: "8. Vos Droits (Art. 15-22 RGPD)", body: `Vous disposez des droits suivants : Accès, Rectification, Effacement, Limitation, Portabilité, Opposition et Retrait du consentement. Pour exercer ces droits : ${EMAIL}. Réponse sous 30 jours. Réclamations : CNIL — www.cnil.fr.` },
      { heading: "9. Cookies", body: `Notre site utilise : cookies strictement nécessaires (panier, session — toujours actifs) ; cookies analytiques (Google Analytics — consentement requis) ; cookies marketing (Meta Pixel — consentement requis). Vous pouvez gérer vos préférences via la bannière de consentement ou les paramètres du footer.` },
      { heading: "10. Sécurité", body: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées : chiffrement SSL/TLS, contrôles d'accès, paiements sécurisés. En cas de violation de données, nous vous notifierons ainsi que l'autorité compétente dans les 72 heures (RGPD).` },
    ]
  },

  /* ─────────────────── PRIVACY POLICY (EN) ─────────────────── */
  "privacy": {
    title: "Privacy Policy",
    lastUpdated: "June 2026",
    sections: [
      { heading: "1. Data Controller", body: `The data controller responsible for your personal data is: ${COMPANY}, ${REG_ADDRESS}, India. Email: ${EMAIL}.` },
      { heading: "2. What Data We Collect", body: `We collect: identity data (name); contact data (email, phone, delivery/billing address); transaction data (order history, payment method type); technical data (IP address, browser, cookies); marketing preferences; communications you send us.` },
      { heading: "3. Legal Basis for Processing (GDPR Art. 6)", body: `We process your data on these grounds: Performance of contract (order processing); Legal obligation (tax & accounting); Legitimate interests (improving website, fraud prevention); Consent (marketing emails, non-essential cookies — withdrawable at any time).` },
      { heading: "4. How We Use Your Data", body: `We use your data to: process and fulfil orders; send confirmations, shipping updates, and receipts; respond to enquiries; send marketing communications (consent only); improve our website through analytics; comply with legal obligations; prevent fraud.` },
      { heading: "5. Data Sharing", body: `We do not sell your personal data. We share it only with: payment processors (PayPal); shipping and logistics providers; email service providers; website analytics providers (Google Analytics); legal and regulatory authorities where required by law. All third-party providers are contractually bound by GDPR.` },
      { heading: "6. International Data Transfers", body: `As ${COMPANY} is based in India, your data may be transferred to and processed in India. We protect transfers by implementing Standard Contractual Clauses (SCCs) as approved by the European Commission. You may request a copy of the relevant safeguards by contacting ${EMAIL}.` },
      { heading: "7. Data Retention", body: `Order data: 10 years (French accounting law); Customer account data: 3 years from last activity; Marketing consent records: until withdrawal + 3 years; Cookie data: maximum 13 months (CNIL guidance).` },
      { heading: "8. Your Rights (GDPR Art. 15-22)", body: `You have the rights of: Access, Rectification, Erasure, Restriction, Portability, Objection, and Withdrawal of Consent. To exercise any right: ${EMAIL}. We respond within 30 days. Complaints: CNIL — www.cnil.fr.` },
      { heading: "9. Cookies", body: `Our website uses: strictly necessary cookies (cart, login — always active); analytics cookies (Google Analytics — consent required); marketing cookies (Meta Pixel — consent required). Manage preferences via our cookie consent banner or footer settings link.` },
      { heading: "10. Data Security", body: `We implement SSL/TLS encryption, access controls, and secure payment processing. In the event of a data breach, we will notify you and the relevant supervisory authority within 72 hours as required by GDPR.` },
    ]
  },

  /* ─────────────────── POLITIQUE DE RETOUR ─────────────────── */
  "politique-de-retour": {
    title: "Politique de Retour & Remboursement",
    lastUpdated: "June 2026",
    sections: [
      { heading: "Notre Engagement", body: `Nous voulons que vous adoriez AERI Makhana. Si vous n'êtes pas satisfait, nous ferons en sorte d'arranger les choses. Cette politique s'ajoute à vos droits en vertu du droit français de la consommation et ne les limite pas.` },
      { heading: "Droit de Rétractation — 14 jours (Art. L.221-18)", body: `Vous disposez de 14 jours à compter de la réception de votre commande pour vous rétracter sans motif. Avant le 19 juin 2026 : contactez-nous à ${EMAIL} avec votre nom, numéro de commande et déclaration de rétractation. À compter du 19 juin 2026 : utilisez le bouton 'Rétractation' sur la page de votre compte ou dans l'e-mail de confirmation de commande.` },
      { heading: "Retour des Produits", body: `Après notification, vous devez retourner les produits dans les 14 jours. Les frais de retour sont à votre charge sauf si le produit est défectueux ou livré par erreur. Les produits doivent être retournés non ouverts dans leur emballage d'origine. Pour raisons d'hygiène, nous nous réservons le droit de refuser le retour de produits alimentaires ouverts, sauf défaut.` },
      { heading: "Remboursement", body: `Nous vous rembourserons tous les paiements reçus, y compris les frais de livraison standard, dans les 14 jours suivant la réception de votre notification de rétractation. Le remboursement sera effectué par le même moyen de paiement que celui utilisé lors de la transaction initiale.` },
      { heading: "Produits Défectueux ou Incorrects", body: `Si vous recevez un produit endommagé, incorrect, périmé à la livraison ou dont l'emballage a été altéré : contactez-nous dans les 48h à ${EMAIL} avec votre numéro de commande, une description du problème et des photos. Nous organiserons un remboursement complet ou un remplacement sans frais.` },
      { heading: "Exceptions au Droit de Rétractation", body: `Le droit de rétractation ne s'applique pas aux : produits périssables ou à courte durée de vie (Art. L.221-28) ; produits descellés après livraison ne pouvant être retournés pour raisons d'hygiène ; produits personnalisés. Les sachets AERI Makhana ouverts ou partiellement consommés sont considérés comme périssables.` },
      { heading: "Traitement des Remboursements", body: `Les remboursements approuvés sont traités dans les 14 jours suivant réception de votre retour ou confirmation de rétractation. Les délais de traitement bancaire peuvent ajouter 3 à 5 jours ouvrables supplémentaires.` },
      { heading: "Avertissement Allergènes", body: `Les produits AERI Makhana sont fabriqués dans une installation traitant diverses épices, noix et ingrédients alimentaires. La contamination croisée ne peut être entièrement exclue. Si vous avez des allergies, lisez attentivement les informations allergènes sur l'étiquette du produit avant consommation.` },
    ]
  },

  /* ─────────────────── RETURN POLICY (EN) ─────────────────── */
  "return-policy": {
    title: "Return & Refund Policy",
    lastUpdated: "June 2026",
    sections: [
      { heading: "Our Commitment", body: `We want you to love AERI Makhana. If you are not satisfied, we want to make it right. This policy is in addition to, and does not limit, your rights under French and EU consumer law.` },
      { heading: "Right of Withdrawal — 14-Day Cooling Off Period", body: `You have 14 days from receipt of your order to withdraw for any reason. Before 19 June 2026: contact us at ${EMAIL} with your name, order number, and clear statement of withdrawal. From 19 June 2026: use the dedicated 'Withdrawal' button on your account page or order confirmation email. We will send acknowledgment immediately upon receiving your withdrawal request.` },
      { heading: "Return of Goods", body: `After notifying us of your withdrawal, return products within 14 days. Return shipping costs are borne by the customer unless the product was delivered in error or is defective. Products must be returned in their original, unopened condition. We reserve the right to refuse returns of opened food products for hygiene reasons, unless defective.` },
      { heading: "Refund", body: `We will reimburse all payments, including standard delivery costs, within 14 days of receiving your withdrawal notification or proof of return — whichever is earlier. Refunds are made via the same payment method used for the original transaction.` },
      { heading: "Defective or Incorrect Products", body: `If you receive a product that is damaged, incorrect, past its best-before date at delivery, or tampered with — contact us within 48 hours at ${EMAIL} with your order number, description, and photographs. We will arrange a full refund or replacement at no cost to you.` },
      { heading: "Exceptions to Withdrawal Right", body: `The right of withdrawal does not apply to: perishable goods or goods with a short shelf life (Art. L.221-28); products unsealed after delivery which cannot be returned for hygiene reasons; customised products. Opened AERI Makhana packs are considered perishable once opened.` },
      { heading: "Refund Processing", body: `Approved refunds are processed within 14 days. Bank processing times may add 3-5 business days. Refunds are made to your original payment method.` },
      { heading: "Allergen Disclaimer", body: `AERI Makhana products are manufactured in a facility that processes various spices, nuts, and food ingredients. Cross-contamination cannot be completely excluded. If you have food allergies, review allergen information on the product label carefully before consuming. In the event of an adverse reaction, seek medical attention immediately and contact us.` },
    ]
  },

  /* ─────────────────── SHIPPING POLICY ─────────────────── */
  "shipping-policy": {
    title: "Shipping Policy",
    lastUpdated: "June 2026",
    sections: [
      { heading: "Global Shipping", body: `We ship worldwide. Before completing payment, you will see an automated notification if we do not yet deliver to your specific region or country. We are continuously expanding our delivery network.` },
      { heading: "Free Shipping", body: `Free shipping on all orders above €39.99. Your very first order with AERI also ships free, regardless of order value. Shipping costs for other orders are calculated at checkout based on your delivery address and order weight.` },
      { heading: "Delivery Timeframes", body: `Orders are processed and dispatched within 2-5 business days. Estimated delivery times after dispatch vary by destination. Delivery timeframes are estimates and not guaranteed. During peak periods, processing times may be longer.` },
      { heading: "Customs & Import", body: `AERI Makhana products ship from India. Shipments may be subject to customs inspection by destination country authorities. For EU customers, French and EU import VAT (TVA at the reduced food rate of 5.5%) is included in your checkout total — no additional charges at delivery. Under HS Code 2008.19.21, Makhana carries 0% base customs duty from India to the EU.` },
      { heading: "Tracking", body: `A tracking number will be provided by email once your order is dispatched. Use this to track your shipment with the carrier.` },
      { heading: "Failed Delivery", body: `If a delivery attempt is unsuccessful, the carrier will leave a notification. If you do not collect or rearrange delivery within the carrier's specified timeframe, the parcel may be returned to us. Re-delivery charges will apply.` },
      { heading: "Lost or Damaged in Transit", body: `If your order arrives damaged or does not arrive within 10 business days of the expected delivery date, contact us at ${EMAIL} with your order number and, where applicable, photographs of the damage. We will investigate and arrange a replacement or refund as appropriate.` },
    ]
  },

  /* ─────────────────── POLITIQUE D'EXPÉDITION ─────────────────── */
  "politique-expedition": {
    title: "Politique d'Expédition",
    lastUpdated: "June 2026",
    sections: [
      { heading: "Livraison Mondiale", body: `Nous livrons dans le monde entier. Avant de finaliser votre paiement, un message automatique vous informera si nous ne livrons pas encore dans votre région ou pays spécifique. Nous étendons continuellement notre réseau de livraison.` },
      { heading: "Livraison Gratuite", body: `Livraison gratuite pour toute commande supérieure à 39,99 €. Votre toute première commande chez AERI bénéficie également de la livraison gratuite, quelle que soit la valeur. Les frais de livraison pour les autres commandes sont calculés au paiement.` },
      { heading: "Délais de Livraison", body: `Les commandes sont traitées et expédiées sous 2 à 5 jours ouvrables. Les délais de livraison estimatifs varient selon la destination. Ces délais sont indicatifs et non garantis.` },
      { heading: "Douanes & Importation", body: `Les produits AERI Makhana sont expédiés depuis l'Inde. Pour les clients UE, la TVA française à l'importation (5,5% taux réduit alimentaire) est incluse dans votre total au paiement — aucun frais supplémentaire à la livraison. Le Makhana bénéficie d'un droit de douane de base à 0% de l'Inde vers l'UE (Code SH 2008.19.21).` },
      { heading: "Suivi de Commande", body: `Un numéro de suivi vous sera communiqué par e-mail à l'expédition de votre commande.` },
      { heading: "Produit Perdu ou Endommagé", body: `Si votre commande arrive endommagée ou n'arrive pas dans les 10 jours ouvrables après la date de livraison prévue, contactez-nous à ${EMAIL} avec votre numéro de commande et des photos. Nous organiserons un remplacement ou un remboursement.` },
    ]
  },

  /* ─────────────────── COOKIE POLICY ─────────────────── */
  "cookie-policy": {
    title: "Cookie Policy",
    lastUpdated: "June 2026",
    sections: [
      { heading: "What Are Cookies", body: `Cookies are small text files stored on your device by your browser when you visit websites. They help websites remember your preferences and understand how you use the site.` },
      { heading: "Strictly Necessary Cookies (always active)", body: `Session cookies: maintain your shopping cart and login status. Security cookies: protect against cross-site request forgery. Load balancing cookies: ensure server stability. These cookies cannot be disabled as the website cannot function properly without them.` },
      { heading: "Analytics Cookies (consent required)", body: `Google Analytics (_ga, _gid): measure website traffic and user behaviour. Data is anonymised. Retention: 13 months maximum per CNIL guidance.` },
      { heading: "Marketing Cookies (consent required)", body: `Meta Pixel (if used): track conversions from Facebook/Instagram advertising. Google Ads: track conversions from Google advertising. Microsoft Clarity: session recording for UX improvement.` },
      { heading: "Managing Your Cookie Preferences", body: `You can manage your cookie preferences at any time via our cookie consent banner on first visit, the 'Cookie Settings' link in our website footer, or your browser settings. Note: disabling all cookies may affect website functionality. For more information: www.allaboutcookies.org.` },
    ]
  },

  /* ─────────────────── RETRACTATION ─────────────────── */
  "retractation": {
    title: "Formulaire de Rétractation",
    lastUpdated: "June 2026",
    sections: [
      { heading: "Votre Droit de Rétractation", body: `Conformément à l'Article L.221-18 du Code de la Consommation, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motif.` },
      { heading: "Comment Exercer ce Droit", body: `Avant le 19 juin 2026 : Envoyez un e-mail à ${EMAIL} avec votre nom, numéro de commande et une déclaration claire de rétractation. À compter du 19 juin 2026 : Utilisez le bouton 'Rétractation' dédié sur la page de votre compte ou dans votre e-mail de confirmation de commande. Nous vous enverrons un accusé de réception sans délai.` },
      { heading: "Formulaire Type de Rétractation", body: `À : AERI Makhana / H&G Ventures Private Limited, ${REG_ADDRESS} / ${EMAIL}. Je/nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien ci-dessous : [description des produits]. Commandé le (*) / reçu le (*) : [date]. Nom du/des consommateur(s) : [nom]. Adresse du/des consommateur(s) : [adresse]. Signature (uniquement si formulaire papier) : [signature]. Date : [date]. (*) Rayez la mention inutile.` },
      { heading: "Remboursement", body: `Nous vous rembourserons dans les 14 jours suivant réception de votre notification de rétractation ou, si nous n'avons pas encore reçu les produits retournés, dans les 14 jours suivant réception de la preuve d'expédition du retour.` },
    ]
  },

  "cgv-b2b": {
    title: "Conditions Générales de Vente (B2B)",
    sections: [
      { heading: "1. Champ d'Application", body: "Les présentes Conditions Générales de Vente (CGV) régissent toutes les relations commerciales entre H&G Ventures Private Limited (exploitant la marque AÉRI) et ses partenaires professionnels (acheteurs B2B, distributeurs, revendeurs, établissements de restauration et hôtels). Toute commande passée implique l'acceptation sans réserve des présentes CGV. Ces conditions prévalent sur tout autre document du partenaire commercial, sauf accord contraire express et écrit de la part d'AÉRI." },
      { heading: "2. Produits et Disponibilité", body: "Nos produits sont proposés dans la limite des stocks disponibles. En cas d'indisponibilité d'un produit après passation de la commande, AÉRI s'engage à en informer le partenaire dans les meilleurs délais et à lui proposer une solution alternative (substitution de produit, délai de livraison prolongé ou remboursement). Tous les produits sont conformes aux réglementations alimentaires européennes (UE) et aux certifications FSSAI, NABL et IEC en vigueur." },
      { heading: "3. Prix et Modalités de Paiement", body: "Tous les prix sont exprimés en Euros (€) hors taxes (HT) et sont susceptibles d'être modifiés sans préavis. Les prix applicables sont ceux figurant sur le bon de commande confirmé. Le paiement est exigible selon les modalités convenues dans le contrat-cadre ou, à défaut, à 30 jours date de facture. En cas de retard de paiement, des pénalités de retard seront appliquées au taux légal en vigueur, augmenté de 5 points, ainsi qu'une indemnité forfaitaire de recouvrement de 40 €." },
      { heading: "4. Livraison et Transfert de Risques", body: "Les délais de livraison sont donnés à titre indicatif. Les livraisons s'effectuent selon les Incoterms convenus (CIF ou FOB). Le transfert de risques s'opère conformément aux Incoterms applicables. AÉRI ne saurait être tenu responsable des retards imputables aux transporteurs, aux douanes ou à des événements de force majeure." },
      { heading: "5. Réclamations et Garanties", body: "Toute réclamation relative à un défaut apparent ou à une non-conformité doit être formulée par écrit dans les 72 heures suivant la réception de la marchandise. Les réclamations tardives ne seront pas prises en compte. En cas de défaut avéré, AÉRI s'engage à remplacer les produits défectueux ou à émettre un avoir, à sa discrétion exclusive. La responsabilité d'AÉRI est limitée au montant de la commande concernée." },
      { heading: "6. Propriété Intellectuelle", body: "Toutes les marques, logos, noms commerciaux, designs et autres éléments de propriété intellectuelle d'AÉRI sont la propriété exclusive de H&G Ventures Private Limited. Toute utilisation non autorisée est strictement interdite. Le partenaire s'engage à utiliser les supports marketing fournis par AÉRI conformément aux directives de la marque." },
      { heading: "7. Confidentialité", body: "Les parties s'engagent à maintenir confidentielle toute information commerciale, technique et financière échangée dans le cadre de leur relation d'affaires, pendant une durée de 3 ans après la fin du contrat. Cette obligation ne s'applique pas aux informations déjà publiques ou dont la divulgation est imposée par la loi." },
      { heading: "8. Droit Applicable et Juridiction", body: "Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution sera soumis, à défaut de règlement amiable, à la compétence exclusive du Tribunal de Commerce de Paris." },
    ]
  }
};

export default function LegalDynamicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const page = pages[slug];

  if (!page) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Link href="/" className="text-[#6E6E73] hover:text-[#111111] underline">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#6E6E73] mb-5">
          <span className="w-6 h-[1px] bg-[#6E6E73]/40" />Legal<span className="w-6 h-[1px] bg-[#6E6E73]/40" />
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">{page.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-sm text-[#6E6E73]">Last updated: {page.lastUpdated || "June 2026"}</motion.p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <div className="bg-white rounded-3xl shadow-sm border border-[#111111]/5 overflow-hidden">
          {page.sections.map((sec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className={`p-5 sm:p-8 md:p-12 ${i > 0 ? "border-t border-[#111111]/5" : ""}`}>
              <h2 className="text-xl font-bold mb-3">{sec.heading}</h2>
              <p className="text-[#111111]/65 leading-[1.9] text-[15px]">{sec.body}</p>
            </motion.div>
          ))}
          <div className="p-5 sm:p-8 md:p-12 border-t border-[#111111]/5 bg-[#FAF8F5]">
            <p className="text-sm text-[#6E6E73]">If you have any questions about this document, please <Link href="/contact" className="text-[#111111] font-medium hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
