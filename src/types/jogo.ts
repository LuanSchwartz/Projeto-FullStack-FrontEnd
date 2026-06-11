export type Direcao = "cima" | "baixo" | "esquerda" | "direita" | "parado";

export type EstadoJogador =
  | "parado"
  | "andando"
  | "acenando"
  | "coracao"
  | "emoji"
  | "palmas"
  | "dancando"
  | "sentado"
  | "comemorando"
  | "cumprimentando";

export type TipoInteracao =
  | "acenar"
  | "coracao"
  | "emoji"
  | "palmas"
  | "dancar"
  | "sentar"
  | "comemorar"
  | "cumprimentar";

export interface Posicao {
  x: number;
  y: number;
}

export interface LimitesMundo {
  largura: number;
  altura: number;
  margem: number;
}

export interface EntradaConexao {
  nome: string;
}

export interface EntradaMovimento {
  cima: boolean;
  baixo: boolean;
  esquerda: boolean;
  direita: boolean;
}

export interface EntradaInteracao {
  tipo: TipoInteracao;
}

export interface EntradaEmoji {
  emoji: string;
}

export interface EntradaMensagem {
  texto: string;
}

export interface EntradaEstado {
  estado: EstadoJogador;
}

export interface InteracaoAtiva {
  tipo: TipoInteracao;
  texto: string;
  criadaEm: number;
  expiraEm: number;
}

export interface MensagemAtiva {
  texto: string;
  criadaEm: number;
  expiraEm: number;
}

export interface Jogador {
  id: string;
  nome: string;
  posicao: Posicao;
  cor: string;
  direcao: Direcao;
  estado: EstadoJogador;
  velocidade: number;
  interacao?: InteracaoAtiva;
  mensagem?: MensagemAtiva;
  conectadoEm: number;
  atualizadoEm: number;
}

export interface SincronizacaoInicial {
  jogadorId: string;
  jogadores: Jogador[];
  limitesMundo: LimitesMundo;
  momento: number;
}

export interface PacotePosicoes {
  jogadores: Jogador[];
  momento: number;
}

export interface EventoJogador {
  jogador: Jogador;
  momento: number;
}

export interface EventoJogadorId {
  jogadorId: string;
  momento: number;
}

export interface EventoInteracao {
  jogadorId: string;
  tipo: TipoInteracao;
  texto: string;
  momento: number;
}

export interface EventoEmoji {
  jogadorId: string;
  emoji: string;
  momento: number;
}

export interface EventoMensagem {
  jogadorId: string;
  texto: string;
  momento: number;
}

export interface EventoAnimacao {
  jogadorId: string;
  tipo: EstadoJogador;
  momento: number;
}

export interface EventosClienteServidor {
  conexao: (entrada: EntradaConexao) => void;
  movimentacao: (entrada: EntradaMovimento) => void;
  interacao: (entrada: EntradaInteracao) => void;
  emoji: (entrada: EntradaEmoji) => void;
  mensagem: (entrada: EntradaMensagem) => void;
  animacao: (entrada: EntradaInteracao) => void;
  atualizacao_estado: (entrada: EntradaEstado) => void;
}

export interface EventosServidorCliente {
  sincronizacao_inicial: (entrada: SincronizacaoInicial) => void;
  conexao: (jogador: Jogador) => void;
  desconexao: (entrada: EventoJogadorId) => void;
  atualizacao_posicao: (entrada: PacotePosicoes) => void;
  interacao: (entrada: EventoInteracao) => void;
  emoji: (entrada: EventoEmoji) => void;
  mensagem: (entrada: EventoMensagem) => void;
  animacao: (entrada: EventoAnimacao) => void;
  atualizacao_estado: (entrada: EventoJogador) => void;
}
