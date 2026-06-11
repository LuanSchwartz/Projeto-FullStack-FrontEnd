import type { EntradaMovimento, LimitesMundo } from "@/types/jogo";

export const movimentoInicial: EntradaMovimento = {
  cima: false,
  baixo: false,
  esquerda: false,
  direita: false
};

export const limitesMundoPadrao: LimitesMundo = {
  largura: 2400,
  altura: 1400,
  margem: 72
};

export const raioProximidade = 230;

export const mensagensRapidas = ["Olá!", "Tudo bem?", "Bem-vindo!"];

export const emojisDisponiveis = ["😄", "👋", "🎉", "❤️"];
