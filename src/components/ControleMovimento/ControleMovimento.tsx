"use client";

import type { EntradaMovimento } from "@/types/jogo";
import { movimentoInicial } from "@/utils/constantesJogo";

interface PropriedadesControleMovimento {
  atualizarMovimento: (movimento: EntradaMovimento) => void;
}

const movimentosPorDirecao: Record<keyof EntradaMovimento, EntradaMovimento> = {
  cima: { ...movimentoInicial, cima: true },
  baixo: { ...movimentoInicial, baixo: true },
  esquerda: { ...movimentoInicial, esquerda: true },
  direita: { ...movimentoInicial, direita: true }
};

export function ControleMovimento({ atualizarMovimento }: PropriedadesControleMovimento) {
  function iniciarMovimento(direcao: keyof EntradaMovimento) {
    atualizarMovimento(movimentosPorDirecao[direcao]);
  }

  function pararMovimento() {
    atualizarMovimento(movimentoInicial);
  }

  return (
    <aside className="controle-movimento" aria-label="Controles de movimento">
      <div className="controle-movimento__atalhos">
        <strong>Desktop</strong>
        <span>WASD ou setas</span>
        <strong>Mobile</strong>
        <span>controles na tela</span>
      </div>

      <div className="controle-movimento__direcional" onContextMenu={(evento) => evento.preventDefault()}>
        <button
          className="controle-movimento__botao controle-movimento__botao--cima"
          type="button"
          aria-label="Mover para cima"
          onPointerDown={() => iniciarMovimento("cima")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onPointerLeave={pararMovimento}
        >
          ↑
        </button>
        <button
          className="controle-movimento__botao controle-movimento__botao--esquerda"
          type="button"
          aria-label="Mover para esquerda"
          onPointerDown={() => iniciarMovimento("esquerda")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onPointerLeave={pararMovimento}
        >
          ←
        </button>
        <button
          className="controle-movimento__botao controle-movimento__botao--baixo"
          type="button"
          aria-label="Mover para baixo"
          onPointerDown={() => iniciarMovimento("baixo")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onPointerLeave={pararMovimento}
        >
          ↓
        </button>
        <button
          className="controle-movimento__botao controle-movimento__botao--direita"
          type="button"
          aria-label="Mover para direita"
          onPointerDown={() => iniciarMovimento("direita")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onPointerLeave={pararMovimento}
        >
          →
        </button>
      </div>
    </aside>
  );
}
