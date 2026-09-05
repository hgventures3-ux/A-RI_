const fs = require('fs');
let code = fs.readFileSync('src/lib/productData.ts', 'utf8');

code = code.replace('origin: string;', 'origin: string;\n    inStock?: boolean;');

const outOfStockSlugs = [
  'herbes-de-provence',
  'mediterranean-herb-fusion',
  'caramel-salt',
  'caramel-beurre-sale',
  'lemon-mint',
  'citron-menthe',
  'peanut-butter',
  'beurre-de-cacahuete',
  'peri-peri',
  'peri-peri-fr',
  'smokey-bbq',
  'bbq-fume',
  'tangy-tomato',
  'tomate-acidulee'
];

outOfStockSlugs.forEach(slug => {
  const regex = new RegExp('"' + slug + '": \\{', 'g');
  code = code.replace(regex, '"' + slug + '": {\n    inStock: false,');
});

fs.writeFileSync('src/lib/productData.ts', code);
console.log('Updated productData.ts');
