"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { LogotipoPraca } from "@/assets/LogotipoPraca";

interface PropriedadesTelaInicial {
  conectando: boolean;
  erro: string | null;
  entrarNoMundo: (nome: string) => void;
}

export function TelaInicial({ conectando, erro, entrarNoMundo }: PropriedadesTelaInicial) {
  const [nome, definirNome] = useState("");

  function aoEnviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    entrarNoMundo(nome);
  }

  return (
    <main className="tela-inicial">
      <motion.section
        className="tela-inicial__conteudo"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="tela-inicial__marca">
          <LogotipoPraca />
          <div>
            <p className="tela-inicial__rotulo">Multiplayer em tempo real</p>
            <h1>Praça Virtual</h1>
          </div>
        </div>

        <p className="tela-inicial__texto">
          Entre com seu nome, encontre outras pessoas e interaja em um espaço social minimalista.
        </p>

        <form className="tela-inicial__formulario" onSubmit={aoEnviarFormulario}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            value={nome}
            onChange={(evento) => definirNome(evento.target.value)}
            maxLength={24}
            placeholder="Digite seu nome"
            autoComplete="name"
          />
          {erro && <p className="tela-inicial__erro">{erro}</p>}
          <button className="botao botao--primario" type="submit" disabled={conectando}>
            {conectando ? "Entrando..." : "Entrar"}
          </button>
          <Link className="botao botao--secundario" href="/entrar-pelo-celular">
            Entrar pelo celular
          </Link>
        </form>
      </motion.section>
    </main>
  );
}
