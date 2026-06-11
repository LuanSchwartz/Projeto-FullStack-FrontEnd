import type { Metadata } from "next";
import "@/styles/variaveis.css";
import "@/styles/animacoes.css";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/components/TelaInicial/TelaInicial.css";
import "@/components/BarraSuperior/BarraSuperior.css";
import "@/components/Mundo/Mundo.css";
import "@/components/Personagem/Personagem.css";
import "@/components/ControleMovimento/ControleMovimento.css";
import "@/components/PainelInteracoes/PainelInteracoes.css";

export const metadata: Metadata = {
  title: "Praca Virtual",
  description: "Ambiente multiplayer em tempo real com Next.js, Express e Socket.IO.",
  icons: {
    icon: "/assets/marca-praca.svg"
  }
};

export default function LayoutRaiz({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
