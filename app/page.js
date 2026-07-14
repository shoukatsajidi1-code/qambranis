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

function OrderLink({ product, className='' }) {
  const text = encodeURIComponent(`Hello Qambranis, I would like to order ${product || 'a handmade dupatta'} for PKR 15,000. Please confirm availability.`);
  return <a className={className} href={`https://wa.me/${WHATSAPP}?text=${text}`} target="_blank" rel="noreferrer">Order on WhatsApp</a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const shown = useMemo(() => filter === 'All' ? products : products.filter(p => p.tone.toLowerCase().includes(filter.toLowerCase())), [filter]);

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

    <section id="top" className="hero">
      <Image src="/images/hero.jpg" alt="Model wearing a handcrafted yellow Qambranis dupatta" fill priority sizes="100vw" className="cover" />
      <div className="shade" />
      <div className="heroCopy">
        <p>Made in Interior Sindh</p>
        <h1>Handcrafted<br/>Heritage.</h1>
        <a href="#collection" className="lightButton">Explore Collection</a>
      </div>
      <div className="scroll">Scroll</div>
    </section>

    <section className="manifesto">
      <p>50+ women artisans</p>
      <h2>Crafted by hand.<br/>Paid with dignity.</h2>
    </section>

    <section id="collection" className="collection sectionPad">
      <div className="sectionHead"><div><p>The Collection</p><h2>One price.<br/>Every piece unique.</h2></div><strong>PKR 15,000</strong></div>
      <div className="chips">
        {['All','Black','Blue','Green','Ivory','Purple'].map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}
      </div>
      <div className="grid">
        {shown.map((p,i)=><article key={p.slug} className="card" onClick={()=>setSelected(p)}>
          <div className="imageWrap"><Image src={`/images/products/${p.slug}-1.webp`} alt={`${p.name} handcrafted dupatta`} fill sizes="(max-width: 720px) 100vw, 50vw" className="cover" /></div>
          <div className="cardText"><div><h3>{p.name}</h3><p>{p.tone}</p></div><span>PKR 15,000</span></div>
        </article>)}
      </div>
    </section>

    <section id="craft" className="split">
      <div className="craftImage"><Image src="/images/craft.jpg" alt="Artisan hand embroidering fabric" fill sizes="(max-width: 900px) 100vw, 50vw" className="cover" /></div>
      <div className="splitText"><p>Our Craft</p><h2>Not made.<br/>Made meaningful.</h2><ul><li>100% handmade</li><li>Interior Sindh</li><li>Custom orders</li><li>Worldwide delivery</li></ul></div>
    </section>

    <section id="story" className="story sectionPad">
      <p>Born at Quaid-i-Azam University</p>
      <h2>A café conversation.<br/>A platform for overlooked skill.</h2>
      <div className="storyFacts"><span>50+ Artisans</span><span>5+ Communities</span><span>1 Shared Purpose</span></div>
    </section>

    <section className="editorial">
      {[1,2,3,4].map((n)=><div className="editorialImg" key={n}><Image src={`/images/editorial/model-${n}.jpeg`} alt="Qambranis editorial" fill sizes="(max-width: 720px) 100vw, 50vw" className="cover" /></div>)}
    </section>

    <section className="delivery sectionPad">
      <div><p>Pakistan</p><h3>Free delivery</h3><span>Within 7 days</span></div>
      <div><p>Worldwide</p><h3>Delivered globally</h3><span>Within 30 days</span></div>
      <div><p>Made for you</p><h3>Custom available</h3><span>By request</span></div>
    </section>

    <section id="contact" className="cta">
      <p>Choose your piece</p>
      <h2>Wear the story.</h2>
      <OrderLink className="lightButton" />
    </section>

    <footer>
      <div className="wordmark footMark">QAMBRANIS<span>Empowering Women</span></div>
      <div className="footerLinks">
        <a href="mailto:info@qambranis.com">Email</a>
        <a href="https://www.instagram.com/qambranisofficial" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.facebook.com/qambranisofficial" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://www.tiktok.com/@qambranisofficial" target="_blank" rel="noreferrer">TikTok</a>
      </div>
      <p>Online only · Pakistan · Worldwide delivery</p>
      <small>© {new Date().getFullYear()} Qambranis</small>
    </footer>

    {selected && <div className="modal" role="dialog" aria-modal="true" onClick={()=>setSelected(null)}>
      <div className="modalBody" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={()=>setSelected(null)}>×</button>
        <div className="modalImage"><Image src={`/images/products/${selected.slug}-1.webp`} alt={selected.name} fill sizes="100vw" className="cover" /></div>
        <div className="modalText"><p>{selected.tone}</p><h2>{selected.name}</h2><strong>PKR 15,000</strong><ul><li>Handmade</li><li>Pakistan delivery included</li><li>Customisation available</li></ul><OrderLink product={selected.name} className="darkButton" /></div>
      </div>
    </div>}
  </main>;
}
