import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getProduct, products, PRICE} from '../../../lib/products';
import '../product.css';

const BASE_URL = 'https://www.qambranis.com';
const WHATSAPP = '923363377447';

export function generateStaticParams() {
  return products.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}) {
  const {slug} = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.name} Handmade Dupatta`;
  const description = `${product.name} is a handmade ${product.tone.toLowerCase()} cultural dupatta crafted by women artisans in interior Sindh. PKR 15,000 including Pakistan delivery.`;
  const url = `${BASE_URL}/products/${product.slug}`;
  const image = `/images/products/${product.slug}-1.webp`;
  return {
    title,
    description,
    alternates:{canonical:url},
    openGraph:{type:'website',title,description,url,images:[{url:image,alt:`${product.name} handmade dupatta`}]},
    twitter:{card:'summary_large_image',title,description,images:[image]}
  };
}

export default async function ProductPage({params}) {
  const {slug} = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const url = `${BASE_URL}/products/${product.slug}`;
  const whatsappText = encodeURIComponent(`Hello Qambranis, I am interested in ${product.name} (${url}). Please confirm availability and payment instructions.`);
  const productSchema = {
    '@context':'https://schema.org',
    '@type':'Product',
    name:product.name,
    description:`Handmade ${product.tone.toLowerCase()} cultural dupatta crafted by women artisans in interior Sindh.`,
    image:Array.from({length:product.images},(_,index)=>`${BASE_URL}/images/products/${product.slug}-${index+1}.webp`),
    sku:`QAM-${product.slug.toUpperCase()}`,
    brand:{'@type':'Brand',name:'Qambranis'},
    material:'Handcrafted textile',
    color:product.tone,
    countryOfOrigin:'Pakistan',
    offers:{
      '@type':'Offer',
      url,
      priceCurrency:'PKR',
      price:String(PRICE),
      availability:'https://schema.org/InStock',
      itemCondition:'https://schema.org/NewCondition',
      shippingDetails:{
        '@type':'OfferShippingDetails',
        shippingDestination:{'@type':'DefinedRegion',addressCountry:'PK'},
        shippingRate:{'@type':'MonetaryAmount',value:'0',currency:'PKR'},
        deliveryTime:{'@type':'ShippingDeliveryTime',handlingTime:{'@type':'QuantitativeValue',minValue:1,maxValue:3,unitCode:'DAY'},transitTime:{'@type':'QuantitativeValue',minValue:1,maxValue:7,unitCode:'DAY'}}
      }
    }
  };
  const breadcrumbSchema = {
    '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:BASE_URL},
      {'@type':'ListItem',position:2,name:'Collection',item:`${BASE_URL}/#collection`},
      {'@type':'ListItem',position:3,name:product.name,item:url}
    ]
  };

  return <main className="productPage">
    <header className="productNav">
      <Link className="productWordmark" href="/">QAMBRANIS<span>Empowering Women</span></Link>
      <Link href="/#collection">Back to collection</Link>
    </header>

    <section className="productHero">
      <div className="productLeadImage"><Image src={`/images/products/${product.slug}-1.webp`} alt={`${product.name} handmade dupatta`} fill priority quality={92} sizes="(max-width: 900px) 100vw, 58vw"/></div>
      <div className="productInfo">
        <p>Qambranis · Handmade in Interior Sindh</p>
        <h1>{product.name}</h1>
        <span>{product.tone}</span>
        <strong>PKR {PRICE.toLocaleString('en-PK')}</strong>
        <ul>
          <li>100% handmade</li>
          <li>Pakistan delivery included</li>
          <li>Customisation available</li>
          <li>Worldwide delivery available</li>
        </ul>
        <a className="productPrimary" href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`} target="_blank" rel="noreferrer">Order on WhatsApp</a>
        <Link className="productSecondary" href="/#contact">Ask a question</Link>
        <small>No payment is taken on this page. Qambranis confirms availability and payment instructions directly.</small>
      </div>
    </section>

    {product.images > 1 && <section className="productGallery" aria-label={`${product.name} gallery`}>
      {Array.from({length:product.images-1},(_,index)=>index+2).map((imageNumber)=><div className="productGalleryImage" key={imageNumber}><Image src={`/images/products/${product.slug}-${imageNumber}.webp`} alt={`${product.name} detail ${imageNumber}`} fill sizes="(max-width: 760px) 100vw, 50vw"/></div>)}
    </section>}

    <section className="productCraft">
      <p>Crafted by hand</p>
      <h2>Made slowly.<br/>Worn proudly.</h2>
      <div><span>Women artisans</span><span>Interior Sindh</span><span>Fairly paid</span><span>Made to order</span></div>
    </section>

    <footer className="productFooter"><Link href="/">QAMBRANIS</Link><span>© 2026 · Handmade cultural dupattas</span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(productSchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema)}}/>
  </main>;
}
