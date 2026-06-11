"use client";

import type { PointerEvent } from "react";
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
  function iniciarMovimento(evento: PointerEvent<HTMLButtonElement>, direcao: keyof EntradaMovimento) {
    evento.preventDefault();
    evento.currentTarget.setPointerCapture(evento.pointerId);
    atualizarMovimento(movimentosPorDirecao[direcao]);
  }

  function pararMovimento(evento?: PointerEvent<HTMLButtonElement>) {
    evento?.preventDefault();

    if (evento?.currentTarget.hasPointerCapture(evento.pointerId)) {
      evento.currentTarget.releasePointerCapture(evento.pointerId);
    }

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
          draggable={false}
          onPointerDown={(evento) => iniciarMovimento(evento, "cima")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        >
          ↑
        </button>
        <button
          className="controle-movimento__botao controle-movimento__botao--esquerda"
          type="button"
          aria-label="Mover para esquerda"
          draggable={false}
          onPointerDown={(evento) => iniciarMovimento(evento, "esquerda")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        >
          ←
        </button>
        <button
          className="controle-movimento__botao controle-movimento__botao--baixo"
          type="button"
          aria-label="Mover para baixo"
          draggable={false}
          onPointerDown={(evento) => iniciarMovimento(evento, "baixo")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        >
          ↓
        </button>
        <button
          className="controle-movimento__botao controle-movimento__botao--direita"
          type="button"
          aria-label="Mover para direita"
          draggable={false}
          onPointerDown={(evento) => iniciarMovimento(evento, "direita")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        >
          →
        </button>
      </div>
    </aside>
  );
}
