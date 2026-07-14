import './globals.css';

export const metadata = {
  title: {default:'Qambranis — Handmade Cultural Dupattas',template:'%s | Qambranis'},
  description: 'Shop handmade cultural dupattas crafted by 50+ women artisans in interior Sindh. Pakistan delivery included and worldwide delivery available.',
  metadataBase: new URL('https://qambranis.com'),
  alternates:{canonical:'/'},
  openGraph:{type:'website',siteName:'Qambranis',title:'Qambranis — Wear the Story',description:'Handmade cultural dupattas. Fairly paid artisans. Delivered worldwide.',url:'https://qambranis.com',images:[{url:'/images/hero.jpg',width:1200,height:630,alt:'Qambranis handcrafted cultural dupatta'}]},
  twitter:{card:'summary_large_image',title:'Qambranis — Wear the Story',description:'Handmade cultural dupattas from interior Sindh.',images:['/images/hero.jpg']},
  robots:{index:true,follow:true},
  icons:{icon:'/icon.png'},
};

const schema={
 '@context':'https://schema.org','@type':'Organization',name:'Qambranis',url:'https://qambranis.com',email:'info@qambranis.com',telephone:'+923363377447',description:'Handmade cultural dupattas crafted by women artisans in interior Sindh.',sameAs:['https://www.instagram.com/qambranisofficial','https://www.facebook.com/qambranisofficial','https://www.tiktok.com/@qambranisofficial']
};
export default function RootLayout({children}){return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>}
