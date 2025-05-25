"use client";

import { Button } from "@/components/ui/button";
import { UserDetails } from "@/hooks/useChat";
import { ServiceItem } from "@/lib/services";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface WhatsAppLinkProps {
  category: string;
  service: string;
  serviceItem: ServiceItem;
  userDetails: UserDetails;
}

export function WhatsAppLink({
  category,
  service,
  serviceItem,
  userDetails,
}: WhatsAppLinkProps) {
  const phoneNumber = "5571987298417";

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const message = encodeURIComponent(
    `Olá, gostaria de saber mais sobre os serviços da Metamorfose.\n\n` +
      `Categoria: ${category}\n` +
      `Serviço: ${service}\n` +
      (serviceItem.price ? `Valor: ${formatPrice(serviceItem.price)}\n` : "") +
      (serviceItem.duration ? `Duração: ${serviceItem.duration}\n` : "") +
      (userDetails.area ? `Área: ${userDetails.area}\n` : "") +
      (userDetails.hasDocument !== undefined
        ? `Documento: ${
            userDetails.hasDocument ? "Tenho um documento" : "Começar do zero"
          }\n`
        : "") +
      (userDetails.additionalInfo
        ? `\nDetalhes adicionais: ${userDetails.additionalInfo}`
        : "")
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
          <span className="font-medium">Categoria:</span> {category}
        </p>
        <p>
          <span className="font-medium">Serviço:</span> {service}
        </p>
        {serviceItem.price && (
          <p>
            <span className="font-medium">Valor:</span>{" "}
            {formatPrice(serviceItem.price)}
            {serviceItem.duration && ` (${serviceItem.duration})`}
          </p>
        )}
        {userDetails.area && (
          <p>
            <span className="font-medium">Área:</span> {userDetails.area}
          </p>
        )}
        {userDetails.hasDocument !== undefined && (
          <p>
            <span className="font-medium">Documento:</span>{" "}
            {userDetails.hasDocument ? "Tenho um documento" : "Começar do zero"}
          </p>
        )}
        {userDetails.additionalInfo && (
          <p>
            <span className="font-medium">Detalhes adicionais:</span>{" "}
            {userDetails.additionalInfo}
          </p>
        )}
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
