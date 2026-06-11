export function LogotipoPraca({ compacto = false }: { compacto?: boolean }) {
  return (
    <svg
      className="logotipo-praca"
      width={compacto ? 34 : 48}
      height={compacto ? 34 : 48}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Logo da Praca Virtual"
    >
      <rect x="4" y="4" width="40" height="40" rx="12" fill="#ffffff" />
      <path
        d="M12 31c5-3 8-3 12 0s7 3 12 0"
        fill="none"
        stroke="#16a34a"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M15 23c4-5 14-5 18 0"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="18" r="4.8" fill="#f59e0b" />
      <circle cx="14" cy="32" r="2.6" fill="#e11d48" />
      <circle cx="34" cy="32" r="2.6" fill="#7c3aed" />
    </svg>
  );
}
