import './globals.css';

export const metadata = {
  title: 'Qambranis — Handcrafted Heritage',
  description: 'Handcrafted Balochi and Sindhi dupattas by women artisans of interior Sindh.',
  metadataBase: new URL('https://qambranis.com'),
  openGraph: {
    title: 'Qambranis — Handcrafted Heritage',
    description: 'Handmade in interior Sindh. Fairly paid. Delivered worldwide.',
    images: ['/images/hero.jpg']
  }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
