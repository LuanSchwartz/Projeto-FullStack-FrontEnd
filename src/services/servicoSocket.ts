import { io, type Socket } from "socket.io-client";
import type { EventosClienteServidor, EventosServidorCliente } from "@/types/jogo";

export type SocketJogo = Socket<EventosServidorCliente, EventosClienteServidor>;

export function criarSocketJogo(): SocketJogo {
  return io(obterEnderecoBackend(), {
    autoConnect: false,
    transports: ["websocket", "polling"],
    reconnectionAttempts: 8,
    reconnectionDelay: 600,
    reconnectionDelayMax: 1800,
    timeout: 6000
  });
}

function obterEnderecoBackend() {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  if (typeof window === "undefined") {
    return "http://localhost:3333";
  }

  const protocolo = window.location.protocol === "https:" ? "https" : "http";
  return `${protocolo}://${window.location.hostname}:3333`;
}
