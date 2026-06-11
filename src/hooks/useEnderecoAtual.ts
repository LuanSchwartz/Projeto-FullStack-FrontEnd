"use client";

import { useEffect, useState } from "react";

export function useEnderecoAtual() {
  const [endereco, definirEndereco] = useState("");

  useEffect(() => {
    const enderecoEntrada = new URL("/", window.location.href).toString();
    definirEndereco(enderecoEntrada);
  }, []);

  return endereco;
}
