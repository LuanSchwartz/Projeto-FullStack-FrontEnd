"use client";

import { Mundo } from "@/components/Mundo/Mundo";
import { TelaInicial } from "@/components/TelaInicial/TelaInicial";
import { ProvedorJogo, useJogo } from "@/contexts/ContextoJogo";

function ConteudoPrincipal() {
  const { jogadorId, conectando, erro, entrarNoMundo } = useJogo();

  if (jogadorId) {
    return <Mundo />;
  }

  return <TelaInicial conectando={conectando} erro={erro} entrarNoMundo={entrarNoMundo} />;
}

export default function PaginaInicial() {
  return (
    <ProvedorJogo>
      <ConteudoPrincipal />
    </ProvedorJogo>
  );
}
