"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { criarSocketJogo, type SocketJogo } from "@/services/servicoSocket";
import type {
  EntradaMovimento,
  Jogador,
  LimitesMundo,
  TipoInteracao
} from "@/types/jogo";
import { limitesMundoPadrao, movimentoInicial } from "@/utils/constantesJogo";

interface ValorContextoJogo {
  jogadorId: string | null;
  jogadores: Jogador[];
  limitesMundo: LimitesMundo;
  conectado: boolean;
  conectando: boolean;
  erro: string | null;
  entrarNoMundo: (nome: string) => void;
  sairDoMundo: () => void;
  atualizarMovimento: (movimento: EntradaMovimento) => void;
  enviarInteracao: (tipo: TipoInteracao) => void;
  enviarEmoji: (emoji: string) => void;
  enviarMensagem: (texto: string) => void;
}

const ContextoJogo = createContext<ValorContextoJogo | null>(null);

export function ProvedorJogo({ children }: { children: ReactNode }) {
  const socketRef = useRef<SocketJogo | null>(null);
  const [jogadorId, definirJogadorId] = useState<string | null>(null);
  const [jogadores, definirJogadores] = useState<Jogador[]>([]);
  const [limitesMundo, definirLimitesMundo] = useState<LimitesMundo>(limitesMundoPadrao);
  const [conectado, definirConectado] = useState(false);
  const [conectando, definirConectando] = useState(false);
  const [erro, definirErro] = useState<string | null>(null);

  const atualizarJogador = useCallback((jogadorAtualizado: Jogador) => {
    definirJogadores((jogadoresAtuais) => {
      const existeJogador = jogadoresAtuais.some((jogador) => jogador.id === jogadorAtualizado.id);

      if (!existeJogador) {
        return [...jogadoresAtuais, jogadorAtualizado];
      }

      return jogadoresAtuais.map((jogador) =>
        jogador.id === jogadorAtualizado.id ? jogadorAtualizado : jogador
      );
    });
  }, []);

  const aplicarInteracaoVisual = useCallback((jogadorIdEvento: string, texto: string) => {
    definirJogadores((jogadoresAtuais) =>
      jogadoresAtuais.map((jogador) => {
        if (jogador.id !== jogadorIdEvento) {
          return jogador;
        }

        const momento = Date.now();
        return {
          ...jogador,
          interacao: {
            tipo: jogador.interacao?.tipo ?? "emoji",
            texto,
            criadaEm: momento,
            expiraEm: momento + 2200
          }
        };
      })
    );
  }, []);

  const registrarEventos = useCallback(
    (socket: SocketJogo) => {
      socket.on("connect", () => {
        definirConectado(true);
        definirConectando(false);
        definirErro(null);
      });

      socket.on("connect_error", () => {
        definirConectando(false);
        definirConectado(false);
        definirErro("Nao foi possivel conectar ao servidor. Confira se o backend esta rodando.");
      });

      socket.on("disconnect", () => {
        definirConectado(false);
      });

      socket.on("sincronizacao_inicial", (entrada) => {
        definirJogadorId(entrada.jogadorId);
        definirJogadores(entrada.jogadores);
        definirLimitesMundo(entrada.limitesMundo);
      });

      socket.on("conexao", (jogador) => {
        atualizarJogador(jogador);
      });

      socket.on("desconexao", (entrada) => {
        definirJogadores((jogadoresAtuais) =>
          jogadoresAtuais.filter((jogador) => jogador.id !== entrada.jogadorId)
        );
      });

      socket.on("atualizacao_posicao", (entrada) => {
        definirJogadores(entrada.jogadores);
      });

      socket.on("atualizacao_estado", (entrada) => {
        atualizarJogador(entrada.jogador);
      });

      socket.on("interacao", (entrada) => {
        if (entrada.texto) {
          aplicarInteracaoVisual(entrada.jogadorId, entrada.texto);
        }
      });

      socket.on("emoji", (entrada) => {
        aplicarInteracaoVisual(entrada.jogadorId, entrada.emoji);
      });

      socket.on("mensagem", (entrada) => {
        definirJogadores((jogadoresAtuais) =>
          jogadoresAtuais.map((jogador) => {
            if (jogador.id !== entrada.jogadorId) {
              return jogador;
            }

            const momento = Date.now();
            return {
              ...jogador,
              mensagem: {
                texto: entrada.texto,
                criadaEm: momento,
                expiraEm: momento + 3200
              }
            };
          })
        );
      });
    },
    [aplicarInteracaoVisual, atualizarJogador]
  );

  const entrarNoMundo = useCallback(
    (nome: string) => {
      const nomeLimpo = nome.trim();
      if (!nomeLimpo) {
        definirErro("Informe seu nome para entrar.");
        return;
      }

      definirConectando(true);
      definirErro(null);

      const socket = criarSocketJogo();
      socketRef.current = socket;
      registrarEventos(socket);
      socket.connect();
      socket.once("connect", () => {
        socket.emit("conexao", { nome: nomeLimpo });
      });
    },
    [registrarEventos]
  );

  const sairDoMundo = useCallback(() => {
    socketRef.current?.emit("movimentacao", movimentoInicial);
    socketRef.current?.disconnect();
    socketRef.current = null;
    definirJogadorId(null);
    definirJogadores([]);
    definirConectado(false);
    definirConectando(false);
  }, []);

  const atualizarMovimento = useCallback((movimento: EntradaMovimento) => {
    socketRef.current?.emit("movimentacao", movimento);
  }, []);

  const enviarInteracao = useCallback((tipo: TipoInteracao) => {
    socketRef.current?.emit("interacao", { tipo });
  }, []);

  const enviarEmoji = useCallback((emoji: string) => {
    socketRef.current?.emit("emoji", { emoji });
  }, []);

  const enviarMensagem = useCallback((texto: string) => {
    socketRef.current?.emit("mensagem", { texto });
  }, []);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const valor = useMemo<ValorContextoJogo>(
    () => ({
      jogadorId,
      jogadores,
      limitesMundo,
      conectado,
      conectando,
      erro,
      entrarNoMundo,
      sairDoMundo,
      atualizarMovimento,
      enviarInteracao,
      enviarEmoji,
      enviarMensagem
    }),
    [
      jogadorId,
      jogadores,
      limitesMundo,
      conectado,
      conectando,
      erro,
      entrarNoMundo,
      sairDoMundo,
      atualizarMovimento,
      enviarInteracao,
      enviarEmoji,
      enviarMensagem
    ]
  );

  return <ContextoJogo.Provider value={valor}>{children}</ContextoJogo.Provider>;
}

export function useJogo() {
  const contexto = useContext(ContextoJogo);

  if (!contexto) {
    throw new Error("useJogo deve ser usado dentro de ProvedorJogo.");
  }

  return contexto;
}
