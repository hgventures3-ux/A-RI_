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
      { heading: "Company Information", body: "AÉRI is a registered trademark and brand operated by H&G Ventures Private Limited, a company incorporated under the laws of India. Registered Office: H&G Ventures Private Limited — European Representation: 15 rue du Louvre, 75001 Paris, France. Company Registration Number: Available upon request. FSSAI License Number: Available upon request. IEC (Import Export Code): Registered and active." },
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
      { heading: "2. Data Controller", body: "The data controller responsible for your personal data is: H&G Ventures Private Limited, operating as AÉRI. European Office: 15 rue du Louvre, 75001 Paris, France. Email: privacy@aeri-snack.com. If you have any questions about how we handle your data, you may contact our Data Protection Officer at the email address above." },
      { heading: "3. Information We Collect", body: "We collect information you provide directly to us, including: your name, email address, postal address, and phone number when you create an account or place an order; payment information (processed securely through our payment provider — we do not store credit card numbers); order history and product preferences; communications you send to us (emails, contact form submissions, customer support inquiries); and newsletter subscription preferences. We also automatically collect certain technical information when you visit our website, including: IP address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, and cookie data." },
      { heading: "4. How We Use Your Information", body: "We use your personal data for the following purposes: (a) to process and fulfill your orders, including shipping and payment processing; (b) to communicate with you about your orders, account, and customer support inquiries; (c) to send you marketing communications (only with your explicit consent), including newsletters, product launches, and promotional offers; (d) to personalize your experience on our website and recommend products; (e) to analyze website usage and improve our services; (f) to comply with legal obligations, including tax and accounting requirements; and (g) to prevent fraud and protect the security of our platform." },
      { heading: "5. Data Sharing", body: "We do not sell your personal data to third parties. We may share your information with: (a) service providers who assist us in operating our business (payment processors, shipping companies, email service providers) — these providers are contractually bound to protect your data; (b) legal authorities when required by law, court order, or regulatory obligation; and (c) professional advisors (lawyers, accountants, auditors) as necessary for business operations. All third-party service providers are GDPR-compliant and process data only on our instructions." },
      { heading: "6. Data Retention", body: "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected: account information is retained for the duration of your account plus 3 years after closure; order and transaction data is retained for 10 years as required by French tax law; marketing preferences are retained until you withdraw consent; and website analytics data is anonymized after 26 months." },
      { heading: "7. Your Rights", body: "Under GDPR, you have the following rights: Right of Access — you can request a copy of all personal data we hold about you; Right to Rectification — you can request correction of inaccurate data; Right to Erasure — you can request deletion of your data (subject to legal retention requirements); Right to Restrict Processing — you can request that we limit how we use your data; Right to Data Portability — you can request your data in a structured, machine-readable format; Right to Object — you can object to processing based on legitimate interests or for direct marketing; and Right to Withdraw Consent — you can withdraw consent for marketing communications at any time. To exercise any of these rights, please contact us at privacy@aeri-snack.com. We will respond within 30 days." },
      { heading: "8. Security", body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include: TLS 1.3 encryption for all data in transit, encrypted storage for sensitive data at rest, regular security audits and vulnerability assessments, strict access controls and employee training, and incident response procedures for potential data breaches. In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and the relevant supervisory authority within 72 hours as required by GDPR." },
      { heading: "9. Contact & Complaints", body: "If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us at: privacy@aeri-snack.com. If you are not satisfied with our response, you have the right to lodge a complaint with the CNIL (Commission Nationale de l'Informatique et des Libertés), the French data protection authority: www.cnil.fr. This Privacy Policy was last updated on May 19, 2026, and may be revised periodically." },
    ]
  },
  "politique-de-retour": {
    title: "Politique de Retour",
    sections: [
      { heading: "Droit de Rétractation", body: "Conformément à l'article L.221-18 du Code de la Consommation, vous disposez d'un délai de 14 jours calendaires à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motif ni à payer de pénalité." },
      { heading: "Vue d'ensemble", body: "Chez AÉRI, votre satisfaction est notre priorité absolue. Nous garantissons la qualité de chaque produit que nous vendons. Cette Politique de Retour décrit les conditions dans lesquelles vous pouvez demander un retour, un échange ou un remboursement pour les produits achetés via notre site officiel ou nos partenaires revendeurs agréés." },
      { heading: "Éligibilité aux Retours", body: "En raison de la nature périssable de nos produits alimentaires, les retours ne sont acceptés que dans les circonstances suivantes : (a) le produit a été endommagé lors de la livraison, (b) le produit reçu est incorrect ou différent de ce qui a été commandé, (c) le produit présente des signes de manipulation ou d'emballage compromis à la livraison, ou (d) le produit a expiré avant la date 'meilleure avant' indiquée. Pour être éligible à un retour, vous devez nous contacter dans les 7 jours calendaires suivant la réception de votre commande. Toutes les réclamations doivent être accompagnées de preuves photographiques (emballage endommagé, produit incorrect, etc.)." },
      { heading: "Articles Non Remboursables", body: "Nous ne pouvons pas accepter les retours pour : les produits ouverts et partiellement consommés (sauf défaut de qualité évident), les produits achetés il y a plus de 7 jours, les produits mal conservés (exposés à la chaleur, à l'humidité ou aux rayons directs du soleil), ou les produits achetés auprès de revendeurs tiers non autorisés. Les cartes cadeaux et les articles promotionnels ne sont pas remboursables." },
      { heading: "Processus de Remboursement", body: "Une fois que nous avons reçu et vérifié votre demande de retour, nous traiterons votre remboursement dans un délai de 5 à 10 jours ouvrables. Les remboursements sont effectués sur le mode de paiement original utilisé lors du paiement. Pour les paiements par carte de crédit, veuillez prévoir 5 à 7 jours ouvrables supplémentaires pour que le remboursement apparaisse sur votre relevé. Les frais d'expédition ne sont pas remboursables, sauf si le retour est dû à notre erreur." },
      { heading: "Politique d'Échange", body: "Si vous souhaitez échanger un produit contre une saveur ou une taille différente, veuillez contacter notre équipe du service client. Les échanges sont soumis à la disponibilité des produits. Si le produit de remplacement est d'une valeur supérieure, la différence vous sera facturée." },
      { heading: "Comment Initier un Retour", body: "Pour initier un retour, veuillez nous envoyer un e-mail à returns@aeri-snack.com avec votre numéro de commande, une description du problème et des preuves photographiques. Notre équipe du service client répondra dans les 24 heures ouvrables avec des instructions. Ne renvoyez aucun produit sans avoir préalablement reçu un numéro d'Autorisation de Retour (RA) de notre équipe." },
      { heading: "Commandes Internationales", body: "Pour les commandes expédiées en dehors de la France, les frais de retour sont à la charge du client, sauf si le retour est dû à une erreur de notre part. Les remboursements internationaux peuvent prendre jusqu'à 15 jours ouvrables en raison des procédures bancaires transfrontalières." },
    ]
  },
  "cgv": {
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
  },
  "mentions-legales": {
    title: "Mentions Légales",
    sections: [
      { heading: "Éditeur du Site", body: "Le site www.aeri-snack.com est édité par H&G Ventures Private Limited, société constituée selon les lois indiennes. Siège social : H&G Ventures Private Limited — Représentation européenne : 15 rue du Louvre, 75001 Paris, France. Numéro d'immatriculation : disponible sur demande. Numéro de licence FSSAI : disponible sur demande. IEC (Code Import Export) : enregistré et actif." },
      { heading: "Directeur de la Publication", body: "Le directeur de la publication du site www.aeri-snack.com est le Directeur Général de H&G Ventures Private Limited. Pour toute demande éditoriale : editorial@aeri-snack.com." },
      { heading: "Hébergement", body: "Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. L'infrastructure d'hébergement est conforme aux exigences du RGPD en matière de traitement et de stockage des données. Toutes les données transmises entre votre navigateur et nos serveurs sont chiffrées via le protocole TLS 1.3." },
      { heading: "Propriété Intellectuelle", body: "L'ensemble du contenu de ce site — textes, images, graphiques, logos, icônes, photographies, vidéos, sons, logiciels et codes — est la propriété exclusive de H&G Ventures Private Limited, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie de ce contenu, par quelque moyen que ce soit, sans l'autorisation écrite préalable de H&G Ventures Private Limited, est strictement interdite et constitue une contrefaçon punissable en vertu des articles L.335-2 et suivants du Code de la propriété intellectuelle français." },
      { heading: "Protection des Données Personnelles", body: "Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement et de portabilité de vos données personnelles. Vous disposez également d'un droit d'opposition au traitement de vos données. Pour exercer ces droits, veuillez contacter notre Délégué à la Protection des Données à : privacy@aeri-snack.com." },
      { heading: "Cookies", body: "Ce site utilise des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. En continuant à utiliser ce site, vous consentez à notre utilisation des cookies conformément à notre Politique de Cookies. Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur à tout moment. Les cookies essentiels au fonctionnement du site ne peuvent pas être désactivés." },
      { heading: "Liens Hypertextes", body: "Ce site peut contenir des liens hypertextes vers des sites tiers. H&G Ventures Private Limited n'a aucun contrôle sur le contenu de ces sites externes et n'accepte aucune responsabilité quant à leur contenu ou à leurs pratiques. L'inclusion d'un lien ne constitue pas une approbation du site lié par AÉRI." },
      { heading: "Droit Applicable et Juridiction", body: "Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l'utilisation de ce site sera soumis à la compétence exclusive des tribunaux compétents de Paris, France. Ces mentions légales ont été mises à jour le 19 mai 2026." },
    ]
  },
  "confidentialite": {
    title: "Politique de Confidentialité",
    sections: [
      { heading: "1. Introduction", body: "H&G Ventures Private Limited, exploitant sous la marque AÉRI ('nous', 'notre'), s'engage à protéger votre vie privée et vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous visitez notre site (www.aeri-snack.com), effectuez un achat, vous abonnez à notre newsletter ou interagissez avec nous de quelque manière que ce soit. Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD - UE 2016/679) et à la loi française Informatique et Libertés." },
      { heading: "2. Responsable du Traitement", body: "Le responsable du traitement de vos données personnelles est : H&G Ventures Private Limited, exploitant sous la marque AÉRI. Bureau européen : 15 rue du Louvre, 75001 Paris, France. E-mail : privacy@aeri-snack.com. Si vous avez des questions sur la manière dont nous traitons vos données, vous pouvez contacter notre Délégué à la Protection des Données à l'adresse e-mail ci-dessus." },
      { heading: "3. Données Collectées", body: "Nous collectons les informations que vous nous fournissez directement, notamment : votre nom, adresse e-mail, adresse postale et numéro de téléphone lors de la création d'un compte ou d'une commande ; vos informations de paiement (traitées en toute sécurité via notre prestataire de paiement — nous ne stockons pas les numéros de carte bancaire) ; votre historique de commandes et vos préférences de produits ; les communications que vous nous envoyez. Nous collectons également automatiquement certaines informations techniques lorsque vous visitez notre site, notamment : l'adresse IP, le type et la version du navigateur, le système d'exploitation, les pages consultées et les données de cookies." },
      { heading: "4. Utilisation des Données", body: "Nous utilisons vos données personnelles aux fins suivantes : (a) traiter et exécuter vos commandes, y compris la livraison et le paiement ; (b) communiquer avec vous concernant vos commandes et votre service client ; (c) vous envoyer des communications marketing (uniquement avec votre consentement explicite) ; (d) personnaliser votre expérience sur notre site ; (e) analyser l'utilisation du site et améliorer nos services ; (f) respecter nos obligations légales, y compris les exigences fiscales et comptables ; et (g) prévenir la fraude et protéger la sécurité de notre plateforme." },
      { heading: "5. Partage des Données", body: "Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec : (a) des prestataires de services qui nous aident à exploiter notre activité (processeurs de paiement, sociétés d'expédition, fournisseurs de services e-mail) — ces prestataires sont contractuellement tenus de protéger vos données ; (b) les autorités légales lorsque la loi, une ordonnance judiciaire ou une obligation réglementaire l'exige ; et (c) des conseillers professionnels. Tous les prestataires tiers sont conformes au RGPD." },
      { heading: "6. Conservation des Données", body: "Nous conservons vos données personnelles uniquement le temps nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées : les informations de compte sont conservées pendant la durée de votre compte plus 3 ans après sa clôture ; les données de commande et de transaction sont conservées pendant 10 ans conformément à la loi fiscale française ; les préférences marketing sont conservées jusqu'à ce que vous retiriez votre consentement." },
      { heading: "7. Vos Droits", body: "En vertu du RGPD, vous disposez des droits suivants : Droit d'accès, Droit de rectification, Droit à l'effacement, Droit à la limitation du traitement, Droit à la portabilité des données, Droit d'opposition et Droit de retrait du consentement pour les communications marketing. Pour exercer l'un de ces droits, veuillez nous contacter à privacy@aeri-snack.com. Nous répondrons dans un délai de 30 jours." },
      { heading: "8. Sécurité", body: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés. En cas de violation de données présentant un risque pour vos droits et libertés, nous vous en informerons ainsi que l'autorité de surveillance compétente dans les 72 heures conformément au RGPD." },
      { heading: "9. Contact et Réclamations", body: "Pour toute question, préoccupation ou réclamation concernant cette Politique de Confidentialité ou nos pratiques en matière de données, veuillez nous contacter à : privacy@aeri-snack.com. Si vous n'êtes pas satisfait de notre réponse, vous avez le droit de déposer une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr. Cette Politique de Confidentialité a été mise à jour le 19 mai 2026." },
    ]
  },
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
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{page.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-sm text-[#6E6E73]">Last updated: {page.lastUpdated || "June 2026"}</motion.p>
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
          <div className="p-8 md:p-12 border-t border-[#111111]/5 bg-[#FAF8F5]">
            <p className="text-sm text-[#6E6E73]">If you have any questions about this document, please <Link href="/contact" className="text-[#111111] font-medium hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
