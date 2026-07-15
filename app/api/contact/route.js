import { NextResponse } from 'next/server';

const EMAIL_PATTERN=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value,max=3000){return String(value||'').trim().slice(0,max)}
function escapeHtml(value){return value.replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}

export async function POST(request){
  try{
    const contentLength=Number(request.headers.get('content-length')||0);
    if(contentLength>12000) return NextResponse.json({error:'Request is too large.'},{status:413});
    const origin=request.headers.get('origin');
    if(origin&&!['https://www.qambranis.com','https://qambranis.com'].includes(origin)) return NextResponse.json({error:'Request not allowed.'},{status:403});
    const body=await request.json();
    if(clean(body.website,200)) return NextResponse.json({ok:true});
    const name=clean(body.name,80);
    const email=clean(body.email,160).toLowerCase();
    const phone=clean(body.phone,40);
    const message=clean(body.message,3000);
    if(name.length<2||!EMAIL_PATTERN.test(email)||message.length<10){
      return NextResponse.json({error:'Please enter a valid name, email address and message.'},{status:400});
    }
    const apiKey=process.env.BREVO_API_KEY;
    const toEmail=process.env.CONTACT_TO_EMAIL||'info@qambranis.com';
    const fromEmail=process.env.CONTACT_FROM_EMAIL||'info@qambranis.com';
    if(!apiKey){
      return NextResponse.json({error:'The contact service is being configured. Please contact us on WhatsApp.'},{status:503});
    }
    const safe={name:escapeHtml(name),email:escapeHtml(email),phone:escapeHtml(phone||'Not provided'),message:escapeHtml(message).replace(/\n/g,'<br/>')};
    const response=await fetch('https://api.brevo.com/v3/smtp/email',{
      method:'POST',
      headers:{'Content-Type':'application/json','api-key':apiKey},
      body:JSON.stringify({
        sender:{name:'Qambranis Website',email:fromEmail},
        to:[{email:toEmail,name:'Qambranis'}],
        replyTo:{email,name},
        subject:`Website enquiry from ${name}`,
        htmlContent:`<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>New Qambranis website enquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Message:</strong><br/>${safe.message}</p></div>`,
        textContent:`New Qambranis website enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone||'Not provided'}\n\nMessage:\n${message}`
      }),
      cache:'no-store'
    });
    if(!response.ok){
      console.error('Brevo contact error',response.status,await response.text());
      return NextResponse.json({error:'Your message could not be sent. Please try WhatsApp instead.'},{status:502});
    }
    return NextResponse.json({ok:true});
  }catch(error){
    console.error('Contact route error',error);
    return NextResponse.json({error:'Your message could not be sent. Please try again.'},{status:500});
  }
}
