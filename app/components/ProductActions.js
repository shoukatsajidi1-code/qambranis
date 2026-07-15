'use client';

import {useState} from 'react';
import {trackEvent} from '../../lib/analytics';

const WHATSAPP='923363377447';

export default function ProductActions({name,url}){
  const [copied,setCopied]=useState(false);
  const message=encodeURIComponent(`Hello Qambranis, I am interested in ${name} (${url}). Please confirm availability and payment instructions.`);
  const shareText=encodeURIComponent(`${name} by Qambranis`);
  const encodedUrl=encodeURIComponent(url);

  async function copyLink(){
    try{
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(()=>setCopied(false),1800);
      trackEvent('share',{method:'copy_link',content_type:'product',item_id:name});
    }catch{
      window.prompt('Copy this link',url);
    }
  }

  return <>
    <a className="productPrimary" href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer" onClick={()=>trackEvent('contact',{method:'whatsapp',location:'product_page',item_name:name})}>Order on WhatsApp</a>
    <div className="productShare" aria-label="Share this product">
      <span>Share</span>
      <a href={`https://wa.me/?text=${shareText}%20${encodedUrl}`} target="_blank" rel="noreferrer" onClick={()=>trackEvent('share',{method:'whatsapp',content_type:'product',item_id:name})}>WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" onClick={()=>trackEvent('share',{method:'facebook',content_type:'product',item_id:name})}>Facebook</a>
      <button type="button" onClick={copyLink}>{copied?'Copied':'Copy link'}</button>
    </div>
    <a className="mobileOrderBar" href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer">Order {name}</a>
  </>;
}
