import Link from 'next/link';
import Image from 'next/image';
import './policy.css';

export default function PolicyPage({eyebrow,title,children}){
  return <main className="policyShell">
    <header className="policyNav"><Link className="policyBrand policyLogo" href="/"><Image src="/images/logo-transparent.png" alt="Qambranis" width={240} height={176}/></Link><Link className="policyBack" href="/">Back to shop</Link></header>
    <section className="policyHero"><p>{eyebrow}</p><h1>{title}</h1></section>
    <article className="policyBody">{children}<div className="policyNote">Questions: <a href="mailto:info@qambranis.com">info@qambranis.com</a> · WhatsApp +92 336 3377447</div></article>
    <footer className="policyFooter"><span>© 2026 Qambranis</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link><Link href="/custom-orders">Custom Orders</Link><Link href="/payment-policy">Payments</Link></div></footer>
  </main>
}
