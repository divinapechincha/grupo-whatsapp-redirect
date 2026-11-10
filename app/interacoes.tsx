'use client';
import { useEffect } from "react";
import { track } from "@/lib/track";

// Ilha minúscula de comportamento: conta a visita, move a pomba com o mouse
// (só em telas com ponteiro preciso) e envia os cliques dos canais ao GTM.
export default function Interacoes() {
  useEffect(() => {
    track("view");

    const dove = document.querySelector<HTMLElement>("[data-parallax]");
    const canMove =
      !!dove &&
      matchMedia("(pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        dove!.style.setProperty("--px", x.toFixed(3));
        dove!.style.setProperty("--py", y.toFixed(3));
      });
    };
    if (canMove) addEventListener("pointermove", onMove, { passive: true });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLElement>("[data-destino]");
      if (!a) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "clique_link_divina", destino: a.dataset.destino });
    };
    document.addEventListener("click", onClick);

    return () => {
      if (canMove) removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
