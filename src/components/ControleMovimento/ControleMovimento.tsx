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
      <div className="controle-movimento__direcional" onContextMenu={(evento) => evento.preventDefault()}>
        <button
          className="controle-movimento__botao controle-movimento__botao--cima"
          type="button"
          data-icone="↑"
          aria-label="Mover para cima"
          draggable={false}
          onContextMenu={(evento) => evento.preventDefault()}
          onMouseDown={(evento) => evento.preventDefault()}
          onTouchStart={(evento) => evento.preventDefault()}
          onPointerDown={(evento) => iniciarMovimento(evento, "cima")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        />
        <button
          className="controle-movimento__botao controle-movimento__botao--esquerda"
          type="button"
          data-icone="←"
          aria-label="Mover para esquerda"
          draggable={false}
          onContextMenu={(evento) => evento.preventDefault()}
          onMouseDown={(evento) => evento.preventDefault()}
          onTouchStart={(evento) => evento.preventDefault()}
          onPointerDown={(evento) => iniciarMovimento(evento, "esquerda")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        />
        <button
          className="controle-movimento__botao controle-movimento__botao--baixo"
          type="button"
          data-icone="↓"
          aria-label="Mover para baixo"
          draggable={false}
          onContextMenu={(evento) => evento.preventDefault()}
          onMouseDown={(evento) => evento.preventDefault()}
          onTouchStart={(evento) => evento.preventDefault()}
          onPointerDown={(evento) => iniciarMovimento(evento, "baixo")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        />
        <button
          className="controle-movimento__botao controle-movimento__botao--direita"
          type="button"
          data-icone="→"
          aria-label="Mover para direita"
          draggable={false}
          onContextMenu={(evento) => evento.preventDefault()}
          onMouseDown={(evento) => evento.preventDefault()}
          onTouchStart={(evento) => evento.preventDefault()}
          onPointerDown={(evento) => iniciarMovimento(evento, "direita")}
          onPointerUp={pararMovimento}
          onPointerCancel={pararMovimento}
          onLostPointerCapture={() => atualizarMovimento(movimentoInicial)}
        />
      </div>
    </aside>
  );
}
