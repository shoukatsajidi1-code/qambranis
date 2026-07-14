import './globals.css';

export const metadata = {
  title: 'Qambranis — Handmade Cultural Dupattas',
  description: 'Shop handmade Sindhi and Balochi cultural dupattas crafted by 50+ women artisans in interior Sindh. Pakistan and worldwide delivery.',
  metadataBase: new URL('https://qambranis.com'),
  openGraph: {title:'Qambranis — Wear the Story',description:'Handmade cultural dupattas. Fairly paid artisans. Delivered worldwide.',images:['/images/hero.jpg']},
  robots:{index:true,follow:true}
};
export default function RootLayout({children}){return <html lang="en"><body>{children}</body></html>}
