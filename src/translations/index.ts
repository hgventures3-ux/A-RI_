/* eslint-disable @typescript-eslint/no-explicit-any */
const t: Record<string, Record<string, any>> = {
  hero: {
    fr: {
      nav: { brand: "La Marque", products: "Produits", contact: "Contact" },
      headline: "Le snacking qui vous élève.",
      hook: "L'équilibre parfait entre tradition millénaire et plaisir instantané",
      quote: "Un super-aliment pour le monde entier",
      quoteAuthor: "AÉRI Makhana",
    },
    en: {
      nav: { brand: "The Brand", products: "Products", contact: "Contact" },
      headline: "Snacking that elevates you.",
      hook: "The perfect balance between ancient tradition and instant pleasure",
      quote: "A superfood for the entire world",
      quoteAuthor: "AÉRI Makhana",
    },
    hi: {
      nav: { brand: "ब्रांड", products: "उत्पाद", contact: "संपर्क करें" },
      headline: "स्नैकिंग जो आपको ऊंचा उठाती है।",
      hook: "प्राचीन परंपरा और तुरंत आनंद के बीच का सही संतुलन",
      quote: "पूरी दुनिया के लिए एक सुपरफूड",
      quoteAuthor: "AÉRI मखाना",
    },
  },
  pro: {
    fr: {
      copyright: "© " + new Date().getFullYear() + " AÉRI Makhana. H&G Ventures Private Limited.",
      returnPolicy: "Politique de Retour",
      privacy: "Confidentialité",
    },
    en: {
      copyright: "© " + new Date().getFullYear() + " AÉRI Makhana. H&G Ventures Private Limited.",
      returnPolicy: "Return Policy",
      privacy: "Privacy Policy",
    },
    hi: {
      copyright: "© " + new Date().getFullYear() + " AÉRI मखाना। H&G Ventures Private Limited.",
      returnPolicy: "वापसी नीति",
      privacy: "गोपनीयता नीति",
    },
  },
};

export default t;
