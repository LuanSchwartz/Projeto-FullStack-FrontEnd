"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TipoInteracao } from "@/types/jogo";
import { emojisDisponiveis, mensagensRapidas } from "@/utils/constantesJogo";

interface PropriedadesPainelInteracoes {
  totalProximos: number;
  enviarInteracao: (tipo: TipoInteracao) => void;
  enviarEmoji: (emoji: string) => void;
  enviarMensagem: (texto: string) => void;
}

const interacoes: Array<{ tipo: TipoInteracao; icone: string; texto: string; exigeProximidade?: boolean }> = [
  { tipo: "acenar", icone: "👋", texto: "Acenar" },
  { tipo: "coracao", icone: "❤️", texto: "Coração" },
  { tipo: "emoji", icone: "😄", texto: "Emoji" },
  { tipo: "palmas", icone: "👏", texto: "Palmas" },
  { tipo: "dancar", icone: "💃", texto: "Dançar" },
  { tipo: "sentar", icone: "🪑", texto: "Sentar" },
  { tipo: "comemorar", icone: "🎉", texto: "Comemorar" },
  { tipo: "cumprimentar", icone: "🙌", texto: "Cumprimentar", exigeProximidade: true }
];

export function PainelInteracoes({
  totalProximos,
  enviarInteracao,
  enviarEmoji,
  enviarMensagem
}: PropriedadesPainelInteracoes) {
  const [aberto, definirAberto] = useState(false);

  return (
    <aside
      className={`painel-interacoes ${aberto ? "painel-interacoes--aberto" : "painel-interacoes--fechado"}`}
      aria-label="Interacoes entre jogadores"
    >
      <button
        className="painel-interacoes__topo"
        type="button"
        aria-expanded={aberto}
        onClick={() => definirAberto((valorAtual) => !valorAtual)}
      >
        <strong>Interações</strong>
        <span>{totalProximos} perto</span>
        <span className="painel-interacoes__alternador" aria-hidden="true" />
      </button>

      <div className="painel-interacoes__conteudo">
        <div className="painel-interacoes__grade">
          {interacoes.map((interacao) => {
            const desabilitado = Boolean(interacao.exigeProximidade && totalProximos === 0);

            return (
              <motion.button
                key={interacao.tipo}
                className="painel-interacoes__botao"
                type="button"
                whileTap={{ scale: desabilitado ? 1 : 0.96 }}
                disabled={desabilitado}
                onClick={() => enviarInteracao(interacao.tipo)}
                title={desabilitado ? "Aproxime-se de alguem" : interacao.texto}
              >
                <span className="painel-interacoes__icone">{interacao.icone}</span>
                <span className="painel-interacoes__texto">{interacao.texto}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="painel-interacoes__linha" aria-label="Emojis rapidos">
          {emojisDisponiveis.map((emoji) => (
            <button key={emoji} type="button" onClick={() => enviarEmoji(emoji)} aria-label={`Enviar ${emoji}`}>
              {emoji}
            </button>
          ))}
        </div>

        <div className="painel-interacoes__mensagens">
          {mensagensRapidas.map((mensagem) => (
            <button key={mensagem} type="button" onClick={() => enviarMensagem(mensagem)}>
              {mensagem}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
