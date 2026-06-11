"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AvatarPersonagem } from "@/assets/AvatarPersonagem";
import type { Jogador, LimitesMundo } from "@/types/jogo";

interface PropriedadesPersonagem {
  jogador: Jogador;
  limitesMundo: LimitesMundo;
  local: boolean;
}

export function Personagem({ jogador, limitesMundo, local }: PropriedadesPersonagem) {
  const esquerda = (jogador.posicao.x / limitesMundo.largura) * 100;
  const topo = (jogador.posicao.y / limitesMundo.altura) * 100;

  return (
    <motion.div
      className={`personagem personagem--${jogador.estado} ${local ? "personagem--local" : ""}`}
      style={{
        left: `${esquerda}%`,
        top: `${topo}%`,
        zIndex: Math.round(jogador.posicao.y)
      }}
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.82, y: 10 }}
      transition={{ duration: 0.22 }}
      layout
    >
      <div className="personagem__nome">{jogador.nome}</div>

      <AnimatePresence>
        {jogador.mensagem && (
          <motion.div
            className="personagem__mensagem"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
          >
            {jogador.mensagem.texto}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {jogador.interacao && (
          <motion.div
            className="personagem__interacao"
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
          >
            {jogador.interacao.texto}
          </motion.div>
        )}
      </AnimatePresence>

      <AvatarPersonagem cor={jogador.cor} estado={jogador.estado} direcao={jogador.direcao} local={local} />
    </motion.div>
  );
}
