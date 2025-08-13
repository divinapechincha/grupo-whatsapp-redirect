// /pages/privacy/Page.js
import './style.css';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [linkWhatsApp, setLinkWhatsApp] = useState(
    "https://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF"
  );

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // Android: usar link com intent
      setLinkWhatsApp(
        "intent://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF#Intent;scheme=https;package=com.whatsapp;end"
      );
    } else {
      // iOS e outros: manter link normal
      setLinkWhatsApp("https://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF");
    }
  }, []);

  return (
    <main>
      <div className="logo-container">
        <Image
          src="/logo.png"
          alt="Logo Divina Pechincha"
          width={120}
          height={120}
          priority
        />
      </div>

      <h1>
        PAGAR CARO NUNCA MAIS!<br />
        NÓS TEMOS AS MELHORES OFERTAS DA INTERNET!
      </h1>

      <a href={linkWhatsApp} className="button-whatsapp">
        👉 Acessar grupo de ofertas VIP
      </a>
    </main>
  );
}
