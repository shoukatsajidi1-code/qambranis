import './globals.css';
import AnalyticsConsent from './components/AnalyticsConsent';

export const metadata = {
  title: {default:'Qambranis — Handmade Cultural Dupattas',template:'%s | Qambranis'},
  description: 'Shop handmade cultural dupattas crafted by 50+ women artisans in interior Sindh. Pakistan delivery included and worldwide delivery available.',
  metadataBase: new URL('https://www.qambranis.com'),
  alternates:{canonical:'/'},
  openGraph:{type:'website',siteName:'Qambranis',title:'Qambranis — Wear the Story',description:'Handmade cultural dupattas. Fairly paid artisans. Delivered worldwide.',url:'https://www.qambranis.com',images:[{url:'/images/qambranis-og.jpg',width:1200,height:630,alt:'Qambranis handmade cultural dupattas'}]},
  twitter:{card:'summary_large_image',title:'Qambranis — Wear the Story',description:'Handmade cultural dupattas from interior Sindh.',images:['/images/qambranis-og.jpg']},
  robots:{index:true,follow:true},
  icons:{icon:'/icon.png'},
  verification:{google:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION||undefined},
};

const storeSchema={
  '@context':'https://schema.org','@type':'OnlineStore',name:'Qambranis',url:'https://www.qambranis.com',
  email:'info@qambranis.com',telephone:'+923363377447',priceRange:'PKR 15,000',
  description:'Handmade cultural dupattas crafted by women artisans in interior Sindh.',
  areaServed:'Worldwide',paymentAccepted:'Bank transfer, JazzCash, Easypaisa, cards',
  sameAs:['https://www.instagram.com/qambranisofficial','https://www.facebook.com/qambranisofficial','https://www.tiktok.com/@qambranisofficial']
};
const faqSchema={
  '@context':'https://schema.org','@type':'FAQPage','mainEntity':[
    {'@type':'Question',name:'Are Qambranis dupattas handmade?',acceptedAnswer:{'@type':'Answer',text:'Yes. Every Qambranis dupatta is handmade by women artisans in interior Sindh.'}},
    {'@type':'Question',name:'Does Qambranis deliver worldwide?',acceptedAnswer:{'@type':'Answer',text:'Yes. Pakistan delivery is normally completed within 7 days and international delivery within 30 days.'}},
    {'@type':'Question',name:'Can a Qambranis dupatta be customised?',acceptedAnswer:{'@type':'Answer',text:'Yes. Custom colours and design requirements can be discussed with Qambranis on WhatsApp.'}}
  ]
};
export default function RootLayout({children}){return <html lang="en"><body>{children}<AnalyticsConsent/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(storeSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/></body></html>}
