import type { Direcao, EstadoJogador } from "@/types/jogo";

interface PropriedadesAvatarPersonagem {
  cor: string;
  estado: EstadoJogador;
  direcao: Direcao;
  local: boolean;
}

export function AvatarPersonagem({ cor, estado, direcao, local }: PropriedadesAvatarPersonagem) {
  return (
    <svg
      className={`avatar-personagem avatar-personagem--${estado} avatar-personagem--direcao-${direcao} ${
        local ? "avatar-personagem--local" : ""
      }`}
      width="74"
      height="92"
      viewBox="0 0 74 92"
      aria-hidden="true"
    >
      <ellipse className="avatar-personagem__sombra" cx="37" cy="86" rx="24" ry="5" fill="#111827" opacity="0.12" />
      <g className="avatar-personagem__direcao">
        <g className="avatar-personagem__silhueta">
          <g className="avatar-personagem__pernas">
            <g className="avatar-personagem__perna avatar-personagem__perna--esquerda">
              <path d="M28 72h7v13h-7V72Z" fill="#1f2937" opacity="0.92" />
              <ellipse cx="31.5" cy="86" rx="4.5" ry="2" fill="#111827" opacity="0.9" />
            </g>
            <g className="avatar-personagem__perna avatar-personagem__perna--direita">
              <path d="M39 72h7v13h-7V72Z" fill="#1f2937" opacity="0.92" />
              <ellipse cx="42.5" cy="86" rx="4.5" ry="2" fill="#111827" opacity="0.9" />
            </g>
          </g>
          <g className="avatar-personagem__braco avatar-personagem__braco--esquerdo">
            <path d="M23 48c-8 2-12 7-12 13" fill="none" stroke={cor} strokeWidth="7" strokeLinecap="round" />
          </g>
          <g className="avatar-personagem__braco avatar-personagem__braco--direito">
            <path d="M51 48c8 2 12 7 12 13" fill="none" stroke={cor} strokeWidth="7" strokeLinecap="round" />
          </g>
          <g className="avatar-personagem__corpo">
            <path
              d="M22 45c0-8 6.7-14.5 15-14.5S52 37 52 45v24c0 4.5-3.5 8-8 8H30c-4.5 0-8-3.5-8-8V45Z"
              fill={cor}
            />
            <path d="M29 37c-3 3-4.5 6.8-4.5 11.4V64c0 4.2 2.1 7.2 5.6 8.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.28" />
          </g>
          <g className="avatar-personagem__cabeca">
            <circle cx="37" cy="22" r="17" fill="#f8d7b0" />
            <path d="M22 22c2-10 10-16 21-15 6 1 10 4 12 10-8-3-17-2-33 5Z" fill="#253047" />
            <circle cx="31" cy="23" r="2" fill="#111827" />
            <circle cx="43" cy="23" r="2" fill="#111827" />
            <circle cx="27" cy="28" r="2.4" fill="#f3a6a6" opacity="0.42" />
            <circle cx="47" cy="28" r="2.4" fill="#f3a6a6" opacity="0.42" />
            <path d="M32 30c3 2.8 7 2.8 10 0" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          <g className="avatar-personagem__coracao">
            <path
              d="M37 43c-6-4-11-8-11-13 0-3 2.2-5 5-5 2 0 3.8 1.1 5 3 1.2-1.9 3-3 5-3 2.8 0 5 2 5 5 0 5-5 9-9 13Z"
              fill="#e11d48"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
