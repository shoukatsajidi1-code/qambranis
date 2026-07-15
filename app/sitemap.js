import {products} from '../lib/products';

export default function sitemap(){
  const base='https://www.qambranis.com';
  const now=new Date();
  const core=['', '/collection', '/privacy','/terms','/shipping','/returns','/custom-orders','/payment-policy','/cookie-policy'].map((path)=>({url:base+path,lastModified:now,changeFrequency:path==='/collection'?'weekly':(path?'yearly':'weekly'),priority:path==='/collection'?0.9:(path?0.3:1)}));
  const catalogue=products.map(({slug})=>({url:`${base}/products/${slug}`,lastModified:now,changeFrequency:'monthly',priority:0.8}));
  return [...core,...catalogue];
}
