'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const products = [
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

const WHATSAPP='923363377447';
const EMAIL='info@qambranis.com';
const PRICE=15000;

function Icon({name}){
  const p={
    bag:<><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    search:<><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5"/></>,
    whatsapp:<><path d="M20.5 3.5A10 10 0 0 0 4.8 15.6L3.5 20.5l5-1.3A10 10 0 1 0 20.5 3.5Z"/><path d="M8.2 7.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 2c.1.3 0 .5-.1.7l-.6.8c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .5-.2 1.6-1 2.2-.7.6-1.7.9-2.8.5-1.2-.4-2.7-1-4.4-2.5-1.4-1.3-2.4-2.9-2.8-4.1-.4-1.2 0-2.2.4-2.8.4-.5.9-.7 1.5-.7Z"/></>,
    instagram:<><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none"/></>,
    facebook:<path d="M13.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" fill="currentColor" stroke="none"/>,
    tiktok:<path d="M14 4v10.3a3.2 3.2 0 1 1-2.4-3.1V8.1a6.3 6.3 0 1 0 5.5 6.2V9.1c1.1.8 2.4 1.3 3.9 1.3V7.2c-2.2 0-4-1.4-4.6-3.2H14Z" fill="currentColor" stroke="none"/>,
    email:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>
}

function money(n){return `PKR ${n.toLocaleString('en-PK')}`}

function PaymentMark({name}){
  if(name==='visa') return <span className="paymentMark visaMark" aria-label="Visa">VISA</span>;
  if(name==='mastercard') return <span className="paymentMark mastercardMark" aria-label="Mastercard"><i/><i/></span>;
  if(name==='bank') return <span className="paymentMark bankMark" aria-label="Bank transfer"><svg viewBox="0 0 40 28" aria-hidden="true"><path d="M4 10 20 3l16 7M7 12h26M9 12v10m7-10v10m8-10v10m7-10v10M5 24h30"/></svg></span>;
  if(name==='jazzcash') return <span className="paymentMark logoPayment jazzPayment" aria-label="JazzCash"><Image src="/images/brand/jazzcash.png" alt="JazzCash" width={150} height={92}/></span>;
  return <span className="paymentMark logoPayment easyPayment" aria-label="Easypaisa"><Image src="/images/brand/easypaisa.png" alt="Easypaisa" width={72} height={72}/></span>;
}

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(null);
  const [activeImage,setActiveImage]=useState(1);
  const [cart,setCart]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [checkout,setCheckout]=useState(false);
  const [payment,setPayment]=useState('Bank Transfer');
  const [form,setForm]=useState({name:'',email:'',phone:'',country:'Pakistan',address:'',note:''});
  const [showAll,setShowAll]=useState(false);

  const shown=useMemo(()=>products.filter(p=>{
    const f=filter==='All'||p.tone.toLowerCase().includes(filter.toLowerCase());
    const q=(p.name+' '+p.tone).toLowerCase().includes(query.toLowerCase());
    return f&&q;
  }),[filter,query]);
  const visibleProducts=(query||filter!=='All'||showAll)?shown:shown.slice(0,6);
  const total=cart.reduce((s,x)=>s+x.qty*PRICE,0);
  const count=cart.reduce((s,x)=>s+x.qty,0);

  function add(p){
    setCart(c=>{const hit=c.find(x=>x.slug===p.slug);return hit?c.map(x=>x.slug===p.slug?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]});
    setCartOpen(true);
  }
  function qty(slug,d){setCart(c=>c.map(x=>x.slug===slug?{...x,qty:Math.max(0,x.qty+d)}:x).filter(x=>x.qty>0))}
  function orderText(){
    const items=cart.map(x=>`${x.qty} × ${x.name} — ${money(x.qty*PRICE)}`).join('\n');
    return encodeURIComponent(`Hello Qambranis, I would like to place this order:\n\n${items}\n\nTotal: ${money(total)}\nPayment: ${payment}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry: ${form.country}\nAddress: ${form.address}\nNote: ${form.note}\n\nPlease confirm availability and payment instructions.`);
  }

  return <main>
    <a className="skipLink" href="#collection">Skip to collection</a>
    <header className="nav">
      <a className="wordmark" href="#top">QAMBRANIS<span>Empowering Women</span></a>
      <nav className={menu?'open':''}>
        <a href="#collection" onClick={()=>setMenu(false)}>Collection</a>
        <a href="#craft" onClick={()=>setMenu(false)}>Craft</a>
        <a href="#story" onClick={()=>setMenu(false)}>Our Story</a>
        <a href="#delivery" onClick={()=>setMenu(false)}>Delivery</a>
        <a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
      </nav>
      <div className="navTools">
        <button className="iconBtn" onClick={()=>document.getElementById('search')?.focus()} aria-label="Search"><Icon name="search"/></button>
        <button className="bagBtn" onClick={()=>setCartOpen(true)} aria-label="Shopping bag"><Icon name="bag"/><span>{count}</span></button>
        <button className="menuButton" onClick={()=>setMenu(!menu)} aria-label="Menu">☰</button>
      </div>
    </header>

    <section id="top" className="hero">
      <Image src="/images/hero-hq.jpg" alt="Qambranis model wearing a handcrafted dupatta" fill priority quality={100} sizes="100vw" className="cover heroImage"/>
      <div className="shade"/>
      <div className="heroCopy brandHero"><p>Handmade in Interior Sindh</p><h1>QAMBRANIS</h1><h2>Wear the story.</h2><a href="#collection" className="lightButton">Explore Collection</a></div>
      <div className="scroll">Scroll</div>
    </section>

    <section className="trustBar">
      <div><b>Handmade</b><span>Never mass produced</span></div>
      <div><b>50+ Artisans</b><span>Fairly paid</span></div>
      <div><b>Worldwide</b><span>Up to 30 days</span></div>
      <div><b>Secure Options</b><span>Cards · Bank · Wallets</span></div>
    </section>

    <section id="collection" className="collection sectionPad">
      <div className="sectionHead"><div><p>The Collection</p><h2>Made by hand.<br/>Chosen by you.</h2></div><strong>PKR 15,000</strong></div>
      <div className="shopTools">
        <div className="searchBox"><Icon name="search"/><input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search collection"/></div>
        <div className="chips">{['All','Black','Blue','Green','Ivory','Purple'].map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}</div>
      </div>
      <div className="grid">
        {visibleProducts.map(p=><article key={p.slug} className="card">
          <button className="imageWrap" onClick={()=>{setSelected(p);setActiveImage(1)}}><Image src={`/images/products/${p.slug}-1.webp`} alt={p.name} fill sizes="(max-width:760px) 100vw,50vw" className="cover"/></button>
          <div className="cardText"><div><span className="productLabel">Handcrafted to order</span><h3>{p.name}</h3><p>{p.tone}</p></div><span className="cardPrice">{money(PRICE)}</span></div>
          <div className="cardActions"><button className="primaryAction" onClick={()=>{setSelected(p);setActiveImage(1)}}>View details</button><button onClick={()=>add(p)}>Add to bag</button></div>
        </article>)}
      </div>
      {!query&&filter==='All'&&shown.length>6&&<div className="collectionMore"><button className="outlineButton" onClick={()=>setShowAll(!showAll)}>{showAll?'Show featured pieces':'View full collection'}</button><span>{showAll?'12 handcrafted pieces':'Showing 6 selected pieces'}</span></div>}
    </section>

    <section id="craft" className="split"><div className="craftImage"><Image src="/images/craft.jpg" alt="Hand embroidery by a Qambranis artisan" fill sizes="(max-width:900px) 100vw,60vw" className="cover"/></div><div className="splitText"><p>Our Craft</p><h2>Every stitch<br/>placed by hand.</h2><ul><li>Interior Sindh</li><li>Traditional embroidery</li><li>Customisation available</li><li>No mass production</li></ul></div></section>

    <section id="story" className="story sectionPad"><p>Qambranis Story</p><h2>Friends. A purpose.<br/>A platform for craft.</h2><div className="storyFacts"><span>50+ Women</span><span>Kashmore</span><span>Kandhkot</span><span>Ghauspur</span><span>Tangwani</span></div></section>

    <section className="editorial">{[1,2,3,4].map(i=><div className="editorialImg" key={i}><Image src={`/images/editorial/model-${i}.jpeg`} alt="Qambranis editorial" fill sizes="(max-width:760px) 100vw,50vw" className="cover"/></div>)}</section>

    <section className="payments sectionPad"><p>Payment Options</p><h2>Choose what works.</h2><div className="paymentGrid"><span><PaymentMark name="visa"/><small>Visa</small></span><span><PaymentMark name="mastercard"/><small>Mastercard</small></span><span><PaymentMark name="bank"/><small>Bank Transfer</small></span><span><PaymentMark name="jazzcash"/><small>JazzCash</small></span><span><PaymentMark name="easypaisa"/><small>Easypaisa</small></span></div><small>Card checkout will activate once the payment gateway is approved. Bank and wallet orders are confirmed directly by Qambranis.</small></section>

    <section id="delivery" className="delivery"><div><p>Pakistan</p><h3>Within 7 Days</h3><span>Delivery included in PKR 15,000</span></div><div><p>Worldwide</p><h3>Within 30 Days</h3><span>Shipping quoted before payment</span></div><div><p>Custom Orders</p><h3>Made for You</h3><span>Discuss colour and design on WhatsApp</span></div></section>

    <section id="contact" className="contactSection"><div className="contactIntro"><p>Contact Qambranis</p><h2>Let’s create<br/>something beautiful.</h2><div className="contactQuick socialLinks"><a className="socialLink whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="Chat with Qambranis on WhatsApp"><span className="socialIcon"><Icon name="whatsapp"/></span><span><b>WhatsApp</b><small>Order & support</small></span></a><a className="socialLink instagram" href="https://www.instagram.com/qambranisofficial" target="_blank" rel="noreferrer" aria-label="Follow Qambranis on Instagram"><span className="socialIcon"><Icon name="instagram"/></span><span><b>Instagram</b><small>Latest collection</small></span></a><a className="socialLink tiktok" href="https://www.tiktok.com/@qambranisofficial" target="_blank" rel="noreferrer" aria-label="Follow Qambranis on TikTok"><span className="socialIcon"><Icon name="tiktok"/></span><span><b>TikTok</b><small>Craft in motion</small></span></a><a className="socialLink facebook" href="https://www.facebook.com/qambranisofficial" target="_blank" rel="noreferrer" aria-label="Follow Qambranis on Facebook"><span className="socialIcon"><Icon name="facebook"/></span><span><b>Facebook</b><small>Community</small></span></a><a className="socialLink emailLink" href={`mailto:${EMAIL}`}><span className="socialIcon"><Icon name="email"/></span><span><b>Email</b><small>{EMAIL}</small></span></a></div></div><form className="contactForm" onSubmit={e=>{e.preventDefault();window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Qambranis enquiry')}&body=${encodeURIComponent(e.currentTarget.message.value)}`}}><label>Your name<input name="name" required/></label><label>Email<input name="email" type="email" required/></label><label>Message<textarea name="message" rows="5" required/></label><button className="darkButton">Send enquiry</button></form></section>

    <footer><div className="footMark"><div className="wordmark">QAMBRANIS<span>Empowering Women</span></div><p>Handmade cultural dupattas from interior Sindh.</p><div className="footerSocial" aria-label="Qambranis social media"><a className="whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp"/><span>WhatsApp</span></a><a className="instagram" href="https://www.instagram.com/qambranisofficial" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram"/><span>Instagram</span></a><a className="facebook" href="https://www.facebook.com/qambranisofficial" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook"/><span>Facebook</span></a><a className="tiktok" href="https://www.tiktok.com/@qambranisofficial" target="_blank" rel="noreferrer" aria-label="TikTok"><Icon name="tiktok"/><span>TikTok</span></a></div></div><div className="footerLinks"><a href="#collection">Collection</a><a href="#story">Story</a><a href="#delivery">Delivery</a><a href="#contact">Contact</a><a href="/shipping">Shipping</a><a href="/returns">Returns</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookie-policy">Cookies</a></div><small>© 2026 Qambranis. Online only. Pakistan.</small><small className="right">PKR 15,000 · Pakistan delivery included</small></footer>

    <a className="whatsappFloat" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp"/><span>WhatsApp</span></a>

    {selected&&<div className="modal" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><div className="productModal"><button className="close" aria-label="Close product" onClick={()=>setSelected(null)}>×</button><div className="productGallery"><div className="modalImage"><Image src={`/images/products/${selected.slug}-${activeImage}.webp`} alt={selected.name} fill sizes="(max-width:800px) 100vw,60vw" className="cover"/></div><div className="thumbs">{Array.from({length:selected.images},(_,i)=>i+1).map(i=><button key={i} className={activeImage===i?'active':''} onClick={()=>setActiveImage(i)}><Image src={`/images/products/${selected.slug}-${i}.webp`} alt="" fill sizes="80px" className="cover"/></button>)}</div></div><div className="modalText"><p>Qambranis · {selected.tone}</p><h2>{selected.name}</h2><strong>{money(PRICE)}</strong><ul><li>100% handmade</li><li>Pakistan delivery included</li><li>Customisation available</li><li>Worldwide delivery available</li></ul><button className="darkButton" onClick={()=>add(selected)}>Add to bag</button><a className="outlineButton" target="_blank" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello Qambranis, I am interested in ${selected.name}.`)}`}>Ask on WhatsApp</a></div></div></div>}

    {cartOpen&&<div className="drawerShade" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="cartDrawer"><div className="drawerHead"><h2>Your Bag</h2><button aria-label="Close bag" onClick={()=>setCartOpen(false)}>×</button></div>{cart.length===0?<div className="empty"><p>Your bag is empty.</p><button className="darkButton" onClick={()=>setCartOpen(false)}>Explore collection</button></div>:<><div className="cartItems">{cart.map(x=><div className="cartItem" key={x.slug}><div className="cartThumb"><Image src={`/images/products/${x.slug}-1.webp`} alt={x.name} fill sizes="90px" className="cover"/></div><div><h3>{x.name}</h3><p>{money(PRICE)}</p><div className="qty"><button onClick={()=>qty(x.slug,-1)}>−</button><span>{x.qty}</span><button onClick={()=>qty(x.slug,1)}>+</button></div></div></div>)}</div><div className="cartTotal"><span>Total</span><strong>{money(total)}</strong></div><button className="darkButton full" onClick={()=>{setCheckout(true);setCartOpen(false)}}>Checkout</button></>}</aside></div>}

    {checkout&&<div className="modal"><div className="checkout"><button className="close" aria-label="Close checkout" onClick={()=>setCheckout(false)}>×</button><div><p>Secure order request</p><h2>Checkout</h2><div className="orderSummary">{cart.map(x=><span key={x.slug}>{x.qty} × {x.name}</span>)}<strong>{money(total)}</strong></div></div><form onSubmit={e=>{e.preventDefault();window.open(`https://wa.me/${WHATSAPP}?text=${orderText()}`,'_blank')}}><div className="formGrid"><label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Phone<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><label>Country<input required value={form.country} onChange={e=>setForm({...form,country:e.target.value})}/></label></div><label>Delivery address<textarea required rows="3" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label><label>Order note<textarea rows="2" value={form.note} onChange={e=>setForm({...form,note:e.target.value})}/></label><fieldset><legend>Payment method</legend>{['Bank Transfer','JazzCash','Easypaisa','Card Payment (confirmation required)'].map(x=><label className="radio" key={x}><input type="radio" name="payment" checked={payment===x} onChange={()=>setPayment(x)}/>{x}</label>)}</fieldset><button className="darkButton full">Send order to WhatsApp</button><small>No payment is taken on this page. Qambranis will confirm stock, international shipping and payment instructions.</small></form></div></div>}
  </main>
}
