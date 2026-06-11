"use client";

import { useEffect, useRef } from "react";
import type { EntradaMovimento } from "@/types/jogo";
import { movimentoInicial } from "@/utils/constantesJogo";

const mapaTeclas: Record<string, keyof EntradaMovimento> = {
  arrowup: "cima",
  w: "cima",
  arrowdown: "baixo",
  s: "baixo",
  arrowleft: "esquerda",
  a: "esquerda",
  arrowright: "direita",
  d: "direita"
};

export function useTecladoMovimento(
  ativo: boolean,
  atualizarMovimento: (movimento: EntradaMovimento) => void
) {
  const movimentoRef = useRef<EntradaMovimento>(movimentoInicial);

  useEffect(() => {
    if (!ativo) {
      return;
    }

    function alterarTecla(tecla: string, pressionada: boolean) {
      const direcao = mapaTeclas[tecla.toLowerCase()];
      if (!direcao) {
        return;
      }

      const proximoMovimento = {
        ...movimentoRef.current,
        [direcao]: pressionada
      };

      if (movimentoRef.current[direcao] === pressionada) {
        return;
      }

      movimentoRef.current = proximoMovimento;
      atualizarMovimento(proximoMovimento);
    }

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (mapaTeclas[evento.key.toLowerCase()]) {
        evento.preventDefault();
        alterarTecla(evento.key, true);
      }
    }

    function aoSoltarTecla(evento: KeyboardEvent) {
      if (mapaTeclas[evento.key.toLowerCase()]) {
        evento.preventDefault();
        alterarTecla(evento.key, false);
      }
    }

    function pararMovimento() {
      movimentoRef.current = movimentoInicial;
      atualizarMovimento(movimentoInicial);
    }

    window.addEventListener("keydown", aoPressionarTecla);
    window.addEventListener("keyup", aoSoltarTecla);
    window.addEventListener("blur", pararMovimento);

    return () => {
      window.removeEventListener("keydown", aoPressionarTecla);
      window.removeEventListener("keyup", aoSoltarTecla);
      window.removeEventListener("blur", pararMovimento);
      pararMovimento();
    };
  }, [ativo, atualizarMovimento]);
}
