"use client";

import { Service, ServiceItem, servicesData } from "@/lib/services";
import { useEffect, useState } from "react";

export type ChatStage =
  | "initial"
  | "category_selection"
  | "service_selection"
  | "conditional_details"
  | "additional_info"
  | "generate_link";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export interface UserDetails {
  area?: string;
  hasDocument?: boolean;
  additionalInfo?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStage, setCurrentStage] = useState<ChatStage>("initial");
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(
    null
  );
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [history, setHistory] = useState<ChatStage[]>(["initial"]);

  useEffect(() => {
    const initialMessage: ChatMessage = {
      text: "Olá! Bem-vindo à Metamorfose. Como posso ajudar você hoje?\n\nPor favor, selecione uma de nossas categorias de serviços para começar.",
      isUser: false,
    };

    setMessages([initialMessage]);
    setTimeout(() => {
      setCurrentStage("category_selection");
      setHistory(["initial", "category_selection"]);
    }, 1000);
  }, []);

  const handleCategorySelect = (category: Service) => {
    const userMessage: ChatMessage = {
      text: `${category.emoji} ${category.name}`,
      isUser: true,
    };

    const botResponse: ChatMessage = {
      text: `Ótimo! Qual desses serviços você busca?`,
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setSelectedCategory(category);
    setCurrentStage("service_selection");
    setHistory((prev) => [...prev, "service_selection"]);
  };

  const handleServiceSelect = (service: ServiceItem) => {
    const userMessage: ChatMessage = {
      text: service.name,
      isUser: true,
    };

    let botResponse: ChatMessage;

    if (service.conditional) {
      botResponse = {
        text: "Estamos quase lá! Preciso das últimas informações para te enviar um orçamento inicial.",
        isUser: false,
      };
      setCurrentStage("conditional_details");
      setHistory((prev) => [...prev, "conditional_details"]);
    } else {
      const price = service.price?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const duration = service.duration ? ` (${service.duration})` : "";
      botResponse = {
        text: `Este serviço tem um investimento fixo de ${price}${duration}!\n\nSe quiser compartilhar mais detalhes antes de prosseguir, aproveite o momento!\n\nMe conte o que julgar relevante, como prazos, formato desejado ou preferências específicas para que sua solicitação seja ainda mais personalizada. (Limite de 300 caracteres).`,
        isUser: false,
      };
      setCurrentStage("additional_info");
      setUserDetails({});
      setHistory((prev) => [...prev, "additional_info"]);
    }

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setSelectedService(service);
  };

  const handleUserInput = (input: string) => {
    const userMessage: ChatMessage = {
      text: input || "Prosseguir sem informações adicionais",
      isUser: true,
    };

    const botResponse: ChatMessage = {
      text: "Tudo certo! Com essas informações, podemos preparar um atendimento mais preciso para você. Agora, basta enviar sua solicitação clicando no botão abaixo!",
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setUserDetails((prev) => ({
      ...prev,
      additionalInfo: input.trim() || undefined,
    }));
    setCurrentStage("generate_link");
    setHistory((prev) => [...prev, "generate_link"]);
  };

  const handleConditionalDetails = (
    area: string,
    hasDocument: boolean,
    additionalInfo?: string
  ) => {
    setUserDetails({ area, hasDocument, additionalInfo });

    const userMessage: ChatMessage = {
      text: `Área: ${area}\n${
        hasDocument ? "Tenho um documento" : "Vou começar do zero"
      }${additionalInfo ? `\nDetalhes: ${additionalInfo}` : ""}`,
      isUser: true,
    };

    const botResponse: ChatMessage = {
      text: "Tudo certo! Com essas informações, podemos preparar um atendimento mais preciso para você. Agora, basta enviar sua solicitação clicando no botão abaixo!",
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setCurrentStage("generate_link");
    setHistory((prev) => [...prev, "generate_link"]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousStage = newHistory[newHistory.length - 1] as ChatStage;

      setCurrentStage(previousStage);
      setHistory(newHistory);

      if (previousStage === "initial") {
        setSelectedCategory(null);
        setSelectedService(null);
        setUserDetails(null);
      } else if (previousStage === "category_selection") {
        setSelectedCategory(null);
        setSelectedService(null);
        setUserDetails(null);
      } else if (previousStage === "service_selection") {
        setSelectedService(null);
        setUserDetails(null);
      }

      setMessages((prev) => prev.slice(0, prev.length - 2));
    }
  };

  const resetChat = () => {
    const initialMessage: ChatMessage = {
      text: "Vamos começar novamente. Por favor, selecione uma de nossas categorias de serviços:",
      isUser: false,
    };

    setMessages([initialMessage]);
    setCurrentStage("category_selection");
    setSelectedCategory(null);
    setSelectedService(null);
    setUserDetails(null);
    setHistory(["initial", "category_selection"]);
  };

  return {
    messages,
    currentStage,
    selectedCategory,
    selectedService,
    userDetails,
    servicesData,
    handleCategorySelect,
    handleServiceSelect,
    handleUserInput,
    handleConditionalDetails,
    handleBack,
    resetChat,
  };
}
