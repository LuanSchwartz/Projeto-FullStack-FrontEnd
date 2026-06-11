"use client";

import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { LogotipoPraca } from "@/assets/LogotipoPraca";
import { useEnderecoAtual } from "@/hooks/useEnderecoAtual";

export default function PaginaEntrarPeloCelular() {
  const endereco = useEnderecoAtual();
  const [qrcode, definirQrcode] = useState("");
  const [copiado, definirCopiado] = useState(false);

  useEffect(() => {
    if (!endereco) {
      return;
    }

    QRCode.toDataURL(endereco, {
      width: 360,
      margin: 2,
      color: {
        dark: "#111827",
        light: "#ffffff"
      }
    }).then(definirQrcode);
  }, [endereco]);

  async function copiarLink() {
    if (!endereco) {
      return;
    }

    await navigator.clipboard.writeText(endereco);
    definirCopiado(true);
    window.setTimeout(() => definirCopiado(false), 1800);
  }

  async function compartilharLink() {
    if (!endereco) {
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: "Praca Virtual",
        text: "Entre na Praca Virtual pelo celular.",
        url: endereco
      });
      return;
    }

    await copiarLink();
  }

  return (
    <main className="pagina-celular">
      <section className="pagina-celular__conteudo">
        <div className="pagina-celular__topo">
          <LogotipoPraca />
          <div>
            <p>Entrada mobile</p>
            <h1>Entrar pelo celular</h1>
          </div>
        </div>

        <div className="pagina-celular__qrcode">
          {qrcode ? (
            <Image
              src={qrcode}
              alt="QR Code para entrar na Praca Virtual"
              width={360}
              height={360}
              unoptimized
            />
          ) : (
            <span>Gerando QR Code...</span>
          )}
        </div>

        <div className="pagina-celular__url" aria-live="polite">
          {endereco || "Carregando endereco..."}
        </div>

        <p className="pagina-celular__texto">
          Abra a camera do celular, leia o QR Code e entre usando o navegador do aparelho.
        </p>

        <div className="pagina-celular__acoes">
          <button className="botao botao--primario" type="button" onClick={copiarLink}>
            {copiado ? "Link copiado" : "Copiar link"}
          </button>
          <button className="botao botao--secundario" type="button" onClick={compartilharLink}>
            Compartilhar
          </button>
          <Link className="botao botao--fantasma" href="/">
            Voltar
          </Link>
        </div>
      </section>
    </main>
  );
}
