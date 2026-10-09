// Envia eventos (view / click) para /api/track
function visitorId(): string {
  try {
    let id = localStorage.getItem("vid");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("vid", id);
    }
    return id;
  } catch {
    return "";
  }
}

export function track(event: "view" | "click") {
  try {
    const q = new URLSearchParams(window.location.search);
    const body = JSON.stringify({
      event,
      visitorId: visitorId(),
      source: q.get("utm_source") || "",
      medium: q.get("utm_medium") || "",
      campaign: q.get("utm_campaign") || "",
      referrer: document.referrer || "",
    });
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true, // garante o envio mesmo com a navegação para o WhatsApp
    }).catch(() => {});
  } catch {}
}
