'use client';
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.location.href = "https://chat.whatsapp.com/EddfpaqyfucGbz1qzIPS2b";
  }, []);

  return (
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
  );
}