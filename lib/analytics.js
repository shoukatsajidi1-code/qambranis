export const ANALYTICS_CONSENT_KEY='qambranis-analytics-consent';

export function hasAnalyticsConsent(){
  if(typeof window==='undefined') return false;
  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY)==='granted';
}

export function trackEvent(name,params={}){
  if(typeof window==='undefined'||!hasAnalyticsConsent()||typeof window.gtag!=='function') return;
  window.gtag('event',name,params);
}
