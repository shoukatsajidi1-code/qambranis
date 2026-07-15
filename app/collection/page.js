import Link from 'next/link';
import {products,PRICE} from '../../lib/products';
import CollectionClient from './CollectionClient';
import './collection.css';

export const metadata={
  title:'Complete Handmade Dupatta Collection',
  description:'Explore the complete Qambranis collection of handmade cultural dupattas crafted by women artisans in interior Sindh.',
  alternates:{canonical:'/collection'},
  openGraph:{title:'Qambranis Complete Collection',description:'Handmade cultural dupattas from interior Sindh.',url:'https://www.qambranis.com/collection',images:['/images/qambranis-og.jpg']}
};

export default function CollectionPage(){
  return <main className="collectionPage">
    <header className="collectionNav"><Link className="collectionWordmark" href="/">QAMBRANIS<span>Empowering Women</span></Link><Link href="/">Home</Link></header>
    <section className="collectionIntro"><p>The complete collection</p><h1>Handmade.<br/>One piece at a time.</h1><div><span>12 designs</span><span>PKR 15,000</span><span>Pakistan delivery included</span></div></section>
    <section className="collectionBody"><CollectionClient products={products} price={PRICE}/></section>
    <section className="orderSteps"><p>How to order</p><h2>Simple. Personal. Direct.</h2><div><article><b>01</b><h3>Choose</h3><span>Select your piece or request custom colours.</span></article><article><b>02</b><h3>Confirm</h3><span>Qambranis confirms availability and delivery.</span></article><article><b>03</b><h3>Pay</h3><span>Use bank transfer, JazzCash, Easypaisa or approved card payment.</span></article></div></section>
    <footer className="collectionFooter"><Link href="/">QAMBRANIS</Link><span>© 2026 · Handmade in interior Sindh</span></footer>
  </main>;
}
