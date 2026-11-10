// Ícones inline (sem biblioteca). Todos usam currentColor e herdam o tamanho do CSS.
const base = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

export const IconWhatsApp = () => (
  <svg {...base} fill="currentColor" fillRule="evenodd">
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.7 13.4l-.3-.2-2.4.6.7-2.3-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-2.6 3.4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.3Z" />
  </svg>
);

export const IconTelegram = () => (
  <svg {...base} fill="currentColor" fillRule="evenodd">
    <path d="M20.6 4.1 3.3 10.8c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.1-2 4.4 3.3c.8.4 1.4.2 1.6-.8l2.9-13.7c.3-1.2-.4-1.7-1.3-1.3ZM9 13.4l8.2-5.2c.4-.2.7-.1.4.2l-6.8 6.1-.3 3-1.5-4.1Z" />
  </svg>
);

export const IconInstagram = () => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconTikTok = () => (
  <svg viewBox="0 0 448 512" aria-hidden focusable={false} fill="currentColor">
    <path d="M448 209.9a210 210 0 0 1-123-39v178a162.5 162.5 0 1 1-140-161v90a74.6 74.6 0 1 0 52 71V0h88a121 121 0 0 0 2 22c8 33 31 60 62 74a121 121 0 0 0 59 15z" />
  </svg>
);

export const IconPlay = () => (
  <svg {...base} fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10-6.5a1 1 0 0 0 0-1.8l-10-6.5A1 1 0 0 0 8 5.5Z" />
  </svg>
);
