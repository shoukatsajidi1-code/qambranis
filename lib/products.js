export const PRICE = 15000;

export const products = [
  { name:'Desert Gold', slug:'yellow', tone:'Yellow · Black', images:4 },
  { name:'Royal Indigo', slug:'blue-red', tone:'Blue · Red', images:3 },
  { name:'Crimson Grove', slug:'green-red', tone:'Green · Red', images:4 },
  { name:'Ivory Noir', slug:'white-black', tone:'Ivory · Black', images:3 },
  { name:'Midnight Garden', slug:'black-colour', tone:'Black · Multicolour', images:4 },
  { name:'Violet Flame', slug:'violet-orange', tone:'Violet · Orange', images:2 },
  { name:'Rose Dune', slug:'beige-magenta', tone:'Beige · Magenta', images:2 },
  { name:'Mint Amethyst', slug:'mint-violet', tone:'Mint · Violet', images:2 },
  { name:'Lavender Emerald', slug:'lavender-emerald', tone:'Lavender · Green', images:1 },
  { name:'Peach Amethyst', slug:'peach-purple', tone:'Peach · Purple', images:2 },
  { name:'Royal Saffron', slug:'purple-gold', tone:'Purple · Gold', images:3 },
  { name:'Festival Ivory', slug:'white-colour', tone:'Ivory · Multicolour', images:4 }
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
