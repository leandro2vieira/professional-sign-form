"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5547992786706";

const COLOR_NAMES = {
  "#FFFFFF": "Branco",
  "#F8F8F8": "Branco suave",
  "#1A1A1A": "Preto",
  "#000000": "Preto",
  "#6DC9A4": "Verde menta",
  "#D4AF37": "Dourado",
  "#F5F0E0": "Creme",
  "#1E3A5F": "Azul marinho",
  "#8B4513": "Marrom",
  "#C0392B": "Vermelho",
};

function colorLabel(hex) {
  if (!hex) return "-";
  const name = COLOR_NAMES[hex.toUpperCase()] ?? COLOR_NAMES[hex];
  return name ? `${name} (${hex})` : hex;
}

function buildSummaryMessage(data) {
  const tipo = data.tipo_logo === "economica" ? "Economica" : "Customizada";
  const lines = [
    `Resumo do pedido - Levieiras`,
    ``,
    `Nome: ${data.nome}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    ``,
    `Tipo: ${tipo}`,
    data.tipo_logo === "economica" && data.modelo_escolhido
      ? `Modelo: ${data.modelo_escolhido}`
      : null,
    ``,
    `Cor do objeto: ${colorLabel(data.cor_objeto)}`,
    `Texto da base: ${data.texto_base || "-"}`,
    `Cor do texto da base: ${colorLabel(data.cor_texto_base)}`,
    `Texto dentro da base: ${data.texto_interno || "-"}`,
    `Cor do texto dentro da base: ${colorLabel(data.cor_texto_interno)}`,
    `Cor da base: ${colorLabel(data.cor_principal)}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return encodeURIComponent(lines);
}

export default function StepSuccess({ onReset, data }) {
  const summaryUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildSummaryMessage(data)}`;
  const contactUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de enviar uma solicitação de logo e tenho uma dúvida.")}`;

  return (
    <div className="py-10 sm:py-16 text-center">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
      >
        <CheckCircle2
          className="mx-auto mb-6"
          size={72}
          style={{ color: "#6DC9A4" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-3">Solicitação enviada!</h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
          Obrigado pela preferência! 🙏 Recebemos o seu pedido e entraremos em
          contato em breve. Se preferir, envie o resumo pelo WhatsApp ou fale
          diretamente conosco.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 py-5"
          >
            <a href={contactUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} className="mr-2" />
              Falar conosco
            </a>
          </Button>

          <Button
            asChild
            className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-5"
          >
            <a href={summaryUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} className="mr-2" />
              Enviar resumo WhatsApp
            </a>
          </Button>
        </div>

        <button
          onClick={onReset}
          className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <RotateCcw size={13} />
          Nova solicitação
        </button>
      </motion.div>
    </div>
  );
}
