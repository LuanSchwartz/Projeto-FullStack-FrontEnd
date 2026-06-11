"use client";

import { AnimatePresence } from "framer-motion";
import { BarraSuperior } from "@/components/BarraSuperior/BarraSuperior";
import { ControleMovimento } from "@/components/ControleMovimento/ControleMovimento";
import { PainelInteracoes } from "@/components/PainelInteracoes/PainelInteracoes";
import { Personagem } from "@/components/Personagem/Personagem";
import { useJogo } from "@/contexts/ContextoJogo";
import { useInterpolacaoJogadores } from "@/hooks/useInterpolacaoJogadores";
import { useTecladoMovimento } from "@/hooks/useTecladoMovimento";
import { raioProximidade } from "@/utils/constantesJogo";
import { calcularDistancia } from "@/utils/calcularDistancia";

export function Mundo() {
  const {
    jogadorId,
    jogadores,
    limitesMundo,
    conectado,
    sairDoMundo,
    atualizarMovimento,
    enviarInteracao,
    enviarEmoji,
    enviarMensagem
  } = useJogo();

  const jogadoresInterpolados = useInterpolacaoJogadores(jogadores);
  const jogadorLocal = jogadores.find((jogador) => jogador.id === jogadorId);

  useTecladoMovimento(conectado, atualizarMovimento);

  const totalProximos = jogadorLocal
    ? jogadores.filter(
        (jogador) =>
          jogador.id !== jogadorLocal.id &&
          calcularDistancia(jogador.posicao, jogadorLocal.posicao) <= raioProximidade
      ).length
    : 0;

  return (
    <div className="aplicacao-jogo">
      <BarraSuperior jogadorLocal={jogadorLocal} totalJogadores={jogadores.length} sairDoMundo={sairDoMundo} />

      <main className="mundo" aria-label="Mapa principal da Praca Virtual">
        <section className="mundo__janela">
          <div className="mundo__gramado mundo__gramado--esquerda" />
          <div className="mundo__gramado mundo__gramado--direita" />
          <div className="mundo__caminho mundo__caminho--horizontal" />
          <div className="mundo__caminho mundo__caminho--vertical" />
          <div className="mundo__lago" />
          <div className="mundo__jardim mundo__jardim--um" />
          <div className="mundo__jardim mundo__jardim--dois" />
          <div className="mundo__banco mundo__banco--um" />
          <div className="mundo__banco mundo__banco--dois" />

          <AnimatePresence>
            {jogadoresInterpolados.map((jogador) => (
              <Personagem
                key={jogador.id}
                jogador={jogador}
                limitesMundo={limitesMundo}
                local={jogador.id === jogadorId}
              />
            ))}
          </AnimatePresence>
        </section>

        <div className="mundo__legenda">
          <span>Desktop: WASD / setas</span>
          <span>Mobile: controles na tela</span>
        </div>
      </main>

      <PainelInteracoes
        totalProximos={totalProximos}
        enviarInteracao={enviarInteracao}
        enviarEmoji={enviarEmoji}
        enviarMensagem={enviarMensagem}
      />

      <ControleMovimento atualizarMovimento={atualizarMovimento} />
    </div>
  );
}
