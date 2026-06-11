import type { Posicao } from "@/types/jogo";

export function calcularDistancia(origem: Posicao, destino: Posicao) {
  const diferencaX = origem.x - destino.x;
  const diferencaY = origem.y - destino.y;

  return Math.hypot(diferencaX, diferencaY);
}
