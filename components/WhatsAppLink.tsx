"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface WhatsAppLinkProps {
  service: string;
  subService: string;
  userDetails: string;
}

export function WhatsAppLink({
  service,
  subService,
  userDetails,
}: WhatsAppLinkProps) {
  const phoneNumber = "5571987298417";

  const message = encodeURIComponent(
    `Olá, gostaria de saber mais sobre os serviços da Metamorfose.\n\n` +
      `Serviço: ${service}\n` +
      `Tipo: ${subService}\n` +
      `Detalhes: ${userDetails}`
  );

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl border border-gray-200 shadow-md text-center"
    >
      <h3 className="text-xl font-bold bg-gradient-to-r from-[#ff5757] to-[#8c52ff] bg-clip-text text-transparent mb-4">
        Resumo da Solicitação
      </h3>

      <div className="text-left mb-6 space-y-2">
        <p>
          <span className="font-medium">Serviço:</span> {service}
        </p>
        <p>
          <span className="font-medium">Tipo:</span> {subService}
        </p>
        <p>
          <span className="font-medium">Detalhes:</span> {userDetails}
        </p>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Clique no botão abaixo para continuar a conversa no WhatsApp
      </p>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 w-full font-medium py-6 rounded-xl text-white flex items-center justify-center gap-2 shadow-lg">
          Continuar no WhatsApp
          <ExternalLink className="h-5 w-5" />
        </Button>
      </a>
    </motion.div>
  );
}
