'use client';
import { useEffect, useState } from "react";

// Número fixo da marca (informado pelo dono da página).
const TOTAL_COMUNIDADE = 10000;

// O número "ao vivo" só aparece a partir deste valor, para nunca exibir um número fraco.
const MIN_AO_VIVO = 100;

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function useCountUp(target: number, ms = 1500) {
  // Começa no valor final (o HTML do servidor já mostra o número certo, sem JS).
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    setN(0);
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);

  return n;
}

export default function Contador() {
  const total = useCountUp(TOTAL_COMUNIDADE);

  const [live, setLive] = useState<{ people: number; days: number } | null>(null);
  useEffect(() => {
    let ativo = true;
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (ativo && d && Number(d.people) >= MIN_AO_VIVO) setLive(d);
      })
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, []);

  const pessoas = useCountUp(live?.people ?? 0, 1200);

  return (
    <div className="counter">
      <p className="counter-total">
        <b aria-label={`Mais de ${fmt(TOTAL_COMUNIDADE)}`}>+{fmt(total)}</b>
        <span>pessoas economizando</span>
      </p>

      {live && (
        <p className="counter-live">
          <i aria-hidden />
          <span>
            <b>{fmt(pessoas)}</b> pessoas foram para o grupo nos últimos {live.days} dias
          </span>
        </p>
      )}
    </div>
  );
}
