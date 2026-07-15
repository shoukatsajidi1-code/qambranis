export default function sitemap(){
 const base='https://www.qambranis.com';
 return ['', '/privacy','/terms','/shipping','/returns','/custom-orders','/payment-policy','/cookie-policy'].map((path)=>({url:base+path,lastModified:new Date(),changeFrequency:path?'yearly':'weekly',priority:path?0.3:1}));
}
