'use client';

import Script from 'next/script';
import {useEffect,useState} from 'react';
import {ANALYTICS_CONSENT_KEY} from '../../lib/analytics';

const measurementId=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function AnalyticsConsent(){
  const [choice,setChoice]=useState(null);

  useEffect(()=>{
    const saved=window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if(saved==='granted'||saved==='denied') setChoice(saved);
  },[]);

  function decide(value){
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY,value);
    setChoice(value);
  }

  return <>
    {measurementId&&choice==='granted'&&<>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive"/>
      <Script id="qambranis-ga" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `}</Script>
    </>}
    {measurementId&&choice===null&&<aside className="cookieBanner" aria-label="Analytics preferences">
      <div><strong>Optional analytics</strong><p>Allow privacy-conscious analytics so Qambranis can understand which pages and actions are useful. No advertising cookies are used.</p></div>
      <div className="cookieActions"><button className="outlineButton" onClick={()=>decide('denied')}>Decline</button><button className="darkButton" onClick={()=>decide('granted')}>Allow analytics</button></div>
    </aside>}
  </>;
}
