"use client";

import { LogotipoPraca } from "@/assets/LogotipoPraca";
import type { Jogador } from "@/types/jogo";

interface PropriedadesBarraSuperior {
  jogadorLocal?: Jogador;
  totalJogadores: number;
  sairDoMundo: () => void;
}

export function BarraSuperior({ jogadorLocal, totalJogadores, sairDoMundo }: PropriedadesBarraSuperior) {
  return (
    <header className="barra-superior">
      <div className="barra-superior__marca">
        <LogotipoPraca compacto />
        <div>
          <strong>Praça Virtual</strong>
          <span>{jogadorLocal ? jogadorLocal.nome : "Conectando"}</span>
        </div>
      </div>

      <div className="barra-superior__status" aria-live="polite">
        <span className="barra-superior__ponto" />
        <strong>{totalJogadores}</strong>
        <span>{totalJogadores === 1 ? "jogador" : "jogadores"}</span>
      </div>

      <button className="barra-superior__sair" type="button" onClick={sairDoMundo}>
        Sair
      </button>
    </header>
  );
}
