'use client';
import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { IconWhatsApp } from "./icons";

const GROUP_URL = "https://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF";
const GROUP_URL_ANDROID =
  "intent://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF#Intent;scheme=https;package=com.whatsapp;end";

// Botão principal. Funciona sem JavaScript (link normal); com JS conta o clique
// e, no Android, abre direto no app do WhatsApp.
export default function CtaGrupo() {
  const [href, setHref] = useState(GROUP_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/android/i.test(ua)) setHref(GROUP_URL_ANDROID);
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "entrar_grupo_whatsapp" });

    track("click");

    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  return (
    <a href={href} onClick={onClick} className="cta">
      <span className="cta-label">Entrar no grupo do WhatsApp</span>
      <span className="cta-disc">
        <IconWhatsApp />
      </span>
    </a>
  );
}
