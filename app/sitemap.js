import {products} from '../lib/products';

export default function sitemap(){
  const base='https://www.qambranis.com';
  const now=new Date();
  const core=['', '/privacy','/terms','/shipping','/returns','/custom-orders','/payment-policy','/cookie-policy'].map((path)=>({url:base+path,lastModified:now,changeFrequency:path?'yearly':'weekly',priority:path?0.3:1}));
  const catalogue=products.map(({slug})=>({url:`${base}/products/${slug}`,lastModified:now,changeFrequency:'monthly',priority:0.8}));
  return [...core,...catalogue];
}
