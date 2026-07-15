'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {trackEvent} from '../../lib/analytics';

export default function CollectionClient({products,price}){
  const [query,setQuery]=useState('');
  const [tone,setTone]=useState('All');
  const filtered=useMemo(()=>products.filter(product=>{
    const text=`${product.name} ${product.tone}`.toLowerCase();
    return text.includes(query.toLowerCase())&&(tone==='All'||product.tone.toLowerCase().includes(tone.toLowerCase()));
  }),[products,query,tone]);

  return <>
    <div className="collectionControls">
      <label><span>Search</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name or colour"/></label>
      <div className="collectionFilters" aria-label="Filter collection">{['All','Black','Blue','Green','Ivory','Purple','Yellow'].map(item=><button key={item} className={tone===item?'active':''} onClick={()=>setTone(item)}>{item}</button>)}</div>
    </div>
    <p className="collectionCount">{filtered.length} handcrafted {filtered.length===1?'piece':'pieces'}</p>
    <div className="collectionGrid">
      {filtered.map(product=><article key={product.slug}>
        <Link className="collectionImage" href={`/products/${product.slug}`} onClick={()=>trackEvent('view_item',{currency:'PKR',value:price,items:[{item_name:product.name,item_id:product.slug,price}]})}>
          <Image src={`/images/products/${product.slug}-1.webp`} alt={`${product.name} handmade dupatta`} fill sizes="(max-width:680px) 50vw, (max-width:1100px) 33vw, 25vw"/>
          <span>View product</span>
        </Link>
        <div className="collectionMeta"><div><small>Handmade · Made to order</small><h2>{product.name}</h2><p>{product.tone}</p></div><strong>PKR {price.toLocaleString('en-PK')}</strong></div>
      </article>)}
    </div>
    {filtered.length===0&&<div className="collectionEmpty"><h2>No matching piece</h2><button onClick={()=>{setQuery('');setTone('All')}}>Clear filters</button></div>}
  </>;
}
