export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  paragraphs: string[];
}

export const initialArticles: JournalArticle[] = [
  {
    slug: 'apero',
    title: 'The Art of the Apéro: Pairing Makhana for Modern Entertaining',
    subtitle: 'How to elevate social snacking with premium roasted fox nuts.',
    date: 'May 12, 2026',
    author: 'AÉRI Makhana',
    image: '/blog_apero.png',
    summary:
      'Discover how puffed makhana seeds provide a crisp, light alternative for modern charcuterie and beverage pairings.',
    metaTitle: 'The Art of the Apéro with Makhana | AÉRI Journal',
    metaDescription:
      'Guides and insights on pairing popped Phool Makhana for entertaining and gourmet snacking.',
    paragraphs: [
      "The apéro is more than just a light gathering; it is an institution of mindful pause, sharing, and hospitality. Modern snacking preferences are shifting toward lighter, cleaner ingredients that do not compromise on crunch or flavor.",
      "Traditional fried snacks and heavy nuts are increasingly giving way to roasted lotus seeds (Phool Makhana). With their airy texture and neutral baseline, makhana acts as a perfect canvas for gourmet seasonings such as pink Himalayan salt and black truffle.",
      "When planning a pairing menu, texture contrast is essential. Crisp popped makhana kernels pair exceptionally well with soft artisanal cheeses, fruit preserves, and tapenades, offering an elevated snacking experience with a clean nutritional profile."
    ],
  },
  {
    slug: 'wine',
    title: 'Pairing Makhana with Fine Wine and Beverages',
    subtitle: 'A sommelier-inspired guide to seasoning profiles and palate harmony.',
    date: 'April 28, 2026',
    author: 'AÉRI Makhana',
    image: '/blog_wine.png',
    summary:
      'An exploration of roasted fox nut flavor combinations that harmonize naturally with crisp whites, reds, and aperitifs.',
    metaTitle: 'Pairing Makhana with Wine | Sourcing & Gastronomy | AÉRI',
    metaDescription:
      'Learn how the subtle crunch and seasoning profiles of makhana complement fine wine and beverage menus.',
    paragraphs: [
      "Pairing wine with snacks requires balancing acidity, tannins, and richness. Because popped makhana is slow-roasted rather than oil-fried, it leaves no greasy film on the palate, making it an ideal companion for wine tasting.",
      "For mineral-forward whites such as Chablis or Sauvignon Blanc, Pink Himalayan Salt makhana accentuates crisp acidity without overpowering citrus nuances. For earthier reds or sparkling wines, subtle truffle aromatics create an inviting synergy.",
      "Distributors and hospitality groups are integrating flavored fox nuts into lounge and bar menus as a differentiated, allergen-friendly alternative to standard peanuts and crisps."
    ],
  },
  {
    slug: 'supermarket',
    title: 'Sourcing Phool Makhana: Growth Trends in Global Supermarkets',
    subtitle: 'Understanding consumer demand for plant-based, gluten-free superfoods.',
    date: 'March 15, 2026',
    author: 'AÉRI Makhana',
    image: '/blog_supermarket.png',
    summary:
      'Key market observations on how retail buyers in Europe, the UK, and North America are stocking fox nuts in health aisles.',
    metaTitle: 'Makhana in Global Retail & Supermarkets | AÉRI Export Guide',
    metaDescription:
      'Retail insights on consumer demand for Phool Makhana (fox nuts) across European and global supermarkets.',
    paragraphs: [
      "Supermarket buyers across North America, the UK, and the EU are actively diversifying their snack categories to meet demand for clean-label, high-protein, and grain-free alternatives.",
      "Phool Makhana ticks every core consumer trend: naturally gluten-free, low glycemic index, plant-based protein, and sustainably harvested from wetlands without intensive deforestation.",
      "With partner facilities certified under FSSC 22000, US FDA, and BRCGS standards, Indian exporters are providing compliant retail-ready packaging and bulk grading tailored to strict import regulations."
    ],
  },
];
