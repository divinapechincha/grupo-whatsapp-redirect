'use client';
import { useEffect } from "react";
import Script from "next/script";

export default function Page() {
  useEffect(() => {
    // Aguarda 800ms para garantir disparo dos scripts
    const timer = setTimeout(() => {
      window.location.href = "https://chat.whatsapp.com/EddfpaqyfucGbz1qzIPS2b";
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Google Analytics GA4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3Z83EGB4VK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3Z83EGB4VK');
        `}
      </Script>
      {/* Pixel da Meta (Facebook) */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1772846193267355'); 
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=1772846193267355&ev=PageView&noscript=1" />
      </noscript>
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif"
      }}>
        <h1>Redirecionando para o grupo do WhatsApp...</h1>
        <p>
          Se não for redirecionado,
          <a href="https://chat.whatsapp.com/EddfpaqyfucGbz1qzIPS2b" style={{ marginLeft: 4 }}>clique aqui</a>.
        </p>
      </div>
    </>
  );
}