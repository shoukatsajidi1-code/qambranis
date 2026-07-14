'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const products = [
  { name:'Desert Gold', slug:'yellow', tone:'Yellow · Black' },
  { name:'Royal Indigo', slug:'blue-red', tone:'Blue · Red' },
  { name:'Crimson Grove', slug:'green-red', tone:'Green · Red' },
  { name:'Ivory Noir', slug:'white-black', tone:'Ivory · Black' },
  { name:'Midnight Garden', slug:'black-colour', tone:'Black · Multicolour' },
  { name:'Violet Flame', slug:'violet-orange', tone:'Violet · Orange' },
  { name:'Rose Dune', slug:'beige-magenta', tone:'Beige · Magenta' },
  { name:'Mint Amethyst', slug:'mint-violet', tone:'Mint · Violet' },
  { name:'Lavender Emerald', slug:'lavender-emerald', tone:'Lavender · Green' },
  { name:'Peach Amethyst', slug:'peach-purple', tone:'Peach · Purple' },
  { name:'Royal Saffron', slug:'purple-gold', tone:'Purple · Gold' },
  { name:'Festival Ivory', slug:'white-colour', tone:'Ivory · Multicolour' }
];

const WHATSAPP = '923363377447';
const EMAIL = 'info@qambranis.com';

function Icon({ name }) {
  const paths = {
    whatsapp: <><path d="M20.5 3.5A10 10 0 0 0 4.8 15.6L3.5 20.5l5-1.3A10 10 0 1 0 20.5 3.5Z"/><path d="M8.2 7.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 2c.1.3 0 .5-.1.7l-.6.8c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.7.2.1.4.1.6-.1l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.3.4.5 0 .5-.2 1.6-1 2.2-.7.6-1.7.9-2.8.5-1.2-.4-2.7-1-4.4-2.5-1.4-1.3-2.4-2.9-2.8-4.1-.4-1.2 0-2.2.4-2.8.4-.5.9-.7 1.5-.7Z"/></>,
    instagram: <><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none"/></>,
    facebook: <path d="M13.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" fill="currentColor" stroke="none"/>,
    tiktok: <path d="M14 4v10.3a3.2 3.2 0 1 1-2.4-3.1V8.1a6.3 6.3 0 1 0 5.5 6.2V9.1c1.1.8 2.4 1.3 3.9 1.3V7.2c-2.2 0-4-1.4-4.6-3.2H14Z" fill="currentColor" stroke="none"/>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function OrderLink({ product, className='' }) {
  const text = encodeURIComponent(`Hello Qambranis, I would like to order ${product || 'a handmade dupatta'} for PKR 15,000. Please confirm availability.`);
  return <a className={className} href={`https://wa.me/${WHATSAPP}?text=${text}`} target="_blank" rel="noreferrer">Order on WhatsApp</a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({name:'', email:'', message:''});
  const shown = useMemo(() => filter === 'All' ? products : products.filter(p => p.tone.toLowerCase().includes(filter.toLowerCase())), [filter]);

  function sendEmail(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Qambranis enquiry from ${form.name || 'customer'}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return <main>
    <header className="nav">
      <a href="#top" className="wordmark">QAMBRANIS<span>Empowering Women</span></a>
      <button className="menuButton" aria-label="Open menu" onClick={() => setMenu(!menu)}>☰</button>
      <nav className={menu ? 'open' : ''}>
        <a href="#collection" onClick={()=>setMenu(false)}>Collection</a>
        <a href="#story" onClick={()=>setMenu(false)}>Our Story</a>
        <a href="#craft" onClick={()=>setMenu(false)}>Craft</a>
        <a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
      </nav>
    </header>

    <aside className="socialDock" aria-label="Qambranis social links">
      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp"/></a>
      <a href="https://www.instagram.com/qambranisofficial" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram"/></a>
      <a href="https://www.tiktok.com/@qambranisofficial" target="_blank" rel="noreferrer" aria-label="TikTok"><Icon name="tiktok"/></a>
      <a href="https://www.facebook.com/qambranisofficial" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook"/></a>
      <a href={`mailto:${EMAIL}`} aria-label="Email"><Icon name="email"/></a>
    </aside>

    <a className="whatsappFloat" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="Chat with Qambranis on WhatsApp"><Icon name="whatsapp"/><span>WhatsApp</span></a>

    <section id="top" className="hero">
      <Image src="/images/hero.jpg" alt="Model wearing a handcrafted yellow Qambranis dupatta" fill priority sizes="100vw" className="cover" />
      <div className="shade" />
      <div className="heroCopy brandHero">
        <p>Handmade in Interior Sindh</p>
        <h1>QAMBRANIS</h1>
        <h2>Wear the story.</h2>
        <div className="heroActions"><a href="#collection" className="lightButton">Explore Collection</a><OrderLink className="textLink" /></div>
      </div>
      <div className="scroll">Scroll</div>
    </section>

    <section className="manifesto">
      <p>50+ women artisans</p>
      <h2>Qambranis.<br/>Made with purpose.</h2>
    </section>

    <section id="collection" className="collection sectionPad">
      <div className="sectionHead"><div><p>Qambranis Collection</p><h2>Every piece.<br/>One of a kind.</h2></div><strong>PKR 15,000</strong></div>
      <div className="chips">
        {['All','Black','Blue','Green','Ivory','Purple'].map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}
      </div>
      <div className="grid">
        {shown.map((p)=><article key={p.slug} className="card" onClick={()=>setSelected(p)}>
          <div className="imageWrap"><Image src={`/images/products/${p.slug}-1.webp`} alt={`${p.name} handcrafted dupatta`} fill sizes="(max-width: 720px) 100vw, 50vw" className="cover" /></div>
          <div className="cardText"><div><h3>{p.name}</h3><p>{p.tone}</p></div><span>PKR 15,000</span></div>
        </article>)}
      </div>
    </section>

    <section id="craft" className="split">
      <div className="craftImage"><Image src="/images/craft.jpg" alt="Artisan hand embroidering fabric" fill sizes="(max-width: 900px) 100vw, 50vw" className="cover" /></div>
      <div className="splitText"><p>Qambranis Craft</p><h2>Made by hand.<br/>Known by name.</h2><ul><li>100% handmade</li><li>50+ women artisans</li><li>Custom orders</li><li>Worldwide delivery</li></ul></div>
    </section>

    <section id="story" className="story sectionPad">
      <p>The Qambranis Story</p>
      <h2>From a café idea<br/>to a cultural platform.</h2>
      <div className="storyFacts"><span>50+ Artisans</span><span>Interior Sindh</span><span>Fairly Paid</span></div>
    </section>

    <section className="editorial">
      {[1,2,3,4].map((n)=><div className="editorialImg" key={n}><Image src={`/images/editorial/model-${n}.jpeg`} alt="Qambranis editorial" fill sizes="(max-width: 720px) 100vw, 50vw" className="cover" /></div>)}
    </section>

    <section className="delivery sectionPad">
      <div><p>Pakistan</p><h3>Delivery included</h3><span>Within 7 days</span></div>
      <div><p>Worldwide</p><h3>Delivered globally</h3><span>Within 30 days</span></div>
      <div><p>Made for you</p><h3>Custom available</h3><span>By request</span></div>
    </section>

    <section id="contact" className="contactSection">
      <div className="contactIntro"><p>Contact Qambranis</p><h2>Choose your piece.</h2><div className="contactQuick"><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><Icon name="whatsapp"/>+92 336 3377447</a><a href={`mailto:${EMAIL}`}><Icon name="email"/>{EMAIL}</a></div></div>
      <form className="contactForm" onSubmit={sendEmail}>
        <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>
        <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
        <label>Message<textarea required rows="5" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Product, colour or custom request"/></label>
        <button className="darkButton" type="submit">Send enquiry</button>
        <small>Opens your email app addressed to {EMAIL}</small>
      </form>
    </section>

    <section className="cta">
      <p>Qambranis</p>
      <h2>Wear the story.</h2>
      <OrderLink className="lightButton" />
    </section>

    <footer>
      <div className="wordmark footMark">QAMBRANIS<span>Empowering Women</span></div>
      <div className="footerLinks">
        <a href={`mailto:${EMAIL}`}>Email</a>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="https://www.instagram.com/qambranisofficial" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.facebook.com/qambranisofficial" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://www.tiktok.com/@qambranisofficial" target="_blank" rel="noreferrer">TikTok</a>
      </div>
      <p>{EMAIL}<br/>+92 336 3377447<br/>Online only · Pakistan · Worldwide delivery</p>
      <small>© {new Date().getFullYear()} Qambranis</small>
    </footer>

    {selected && <div className="modal" role="dialog" aria-modal="true" onClick={()=>setSelected(null)}>
      <div className="modalBody" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={()=>setSelected(null)}>×</button>
        <div className="modalImage"><Image src={`/images/products/${selected.slug}-1.webp`} alt={selected.name} fill sizes="100vw" className="cover" /></div>
        <div className="modalText"><p>Qambranis · {selected.tone}</p><h2>{selected.name}</h2><strong>PKR 15,000</strong><ul><li>Handmade</li><li>Pakistan delivery included</li><li>Customisation available</li></ul><OrderLink product={selected.name} className="darkButton" /></div>
      </div>
    </div>}
  </main>;
}
