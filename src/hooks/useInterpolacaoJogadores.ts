"use client";

import { useEffect, useRef, useState } from "react";
import type { Jogador, Posicao } from "@/types/jogo";

const intensidadeInterpolacao = 0.22;

export function useInterpolacaoJogadores(jogadores: Jogador[]) {
  const alvosRef = useRef(new Map<string, Jogador>());
  const [jogadoresInterpolados, definirJogadoresInterpolados] = useState<Jogador[]>(jogadores);

  useEffect(() => {
    alvosRef.current = new Map(jogadores.map((jogador) => [jogador.id, jogador]));

    definirJogadoresInterpolados((jogadoresAtuais) => {
      const jogadoresAtuaisMapeados = new Map(jogadoresAtuais.map((jogador) => [jogador.id, jogador]));

      return jogadores.map((jogador) => {
        const jogadorAtual = jogadoresAtuaisMapeados.get(jogador.id);

        if (!jogadorAtual) {
          return jogador;
        }

        return {
          ...jogador,
          posicao: jogadorAtual.posicao
        };
      });
    });
  }, [jogadores]);

  useEffect(() => {
    let quadroAnimacao = 0;

    function animar() {
      definirJogadoresInterpolados((jogadoresAtuais) =>
        jogadoresAtuais
          .map((jogadorAtual) => {
            const alvo = alvosRef.current.get(jogadorAtual.id);
            if (!alvo) {
              return null;
            }

            return {
              ...alvo,
              posicao: interpolarPosicao(jogadorAtual.posicao, alvo.posicao)
            };
          })
          .filter((jogador): jogador is Jogador => Boolean(jogador))
      );

      quadroAnimacao = window.requestAnimationFrame(animar);
    }

    quadroAnimacao = window.requestAnimationFrame(animar);

    return () => {
      window.cancelAnimationFrame(quadroAnimacao);
    };
  }, []);

  return jogadoresInterpolados;
}

function interpolarPosicao(atual: Posicao, alvo: Posicao): Posicao {
  const diferencaX = alvo.x - atual.x;
  const diferencaY = alvo.y - atual.y;

  if (Math.abs(diferencaX) < 0.35 && Math.abs(diferencaY) < 0.35) {
    return alvo;
  }

  return {
    x: atual.x + diferencaX * intensidadeInterpolacao,
    y: atual.y + diferencaY * intensidadeInterpolacao
  };
}
