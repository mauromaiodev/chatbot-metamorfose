"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ChatStage =
  | "initial"
  | "service_selection"
  | "sub_service_selection"
  | "user_details"
  | "generate_link";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStage, setCurrentStage] = useState<ChatStage>("initial");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string | null>(
    null
  );
  const [userDetails, setUserDetails] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatStage[]>(["initial"]);

  const initialMessage = useMemo<ChatMessage>(
    () => ({
      text: "Olá! Bem-vindo à Metamorfose. Como posso ajudar você hoje? Por favor, selecione um de nossos serviços para começar.",
      isUser: false,
    }),
    []
  );

  useEffect(() => {
    setMessages([initialMessage]);
    const timer = setTimeout(() => {
      setCurrentStage("service_selection");
      setHistory(["initial", "service_selection"]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [initialMessage]);

  const handleServiceSelect = useCallback((service: string) => {
    const userMessage: ChatMessage = {
      text: service,
      isUser: true,
    };

    const botResponse: ChatMessage = {
      text: `Ótima escolha! Agora, por favor selecione o tipo específico de ${service.toLowerCase()} que você está procurando:`,
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setSelectedService(service);
    setCurrentStage("sub_service_selection");
    setHistory((prev) => [...prev, "sub_service_selection"]);
  }, []);

  const handleSubServiceSelect = useCallback((subService: string) => {
    const userMessage: ChatMessage = {
      text: subService,
      isUser: true,
    };

    const botResponse: ChatMessage = {
      text: "Perfeito! Agora, por favor descreva brevemente o que você precisa, incluindo qualquer detalhe específico que queira compartilhar:",
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setSelectedSubService(subService);
    setCurrentStage("user_details");
    setHistory((prev) => [...prev, "user_details"]);
  }, []);

  const handleUserInput = useCallback((input: string) => {
    const userMessage: ChatMessage = {
      text: input,
      isUser: true,
    };

    const botResponse: ChatMessage = {
      text: "Obrigado por compartilhar seus detalhes. Preparei um link para o WhatsApp onde podemos continuar nossa conversa e fornecer as informações que você precisa.",
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setUserDetails(input);
    setCurrentStage("generate_link");
    setHistory((prev) => [...prev, "generate_link"]);
  }, []);

  const handleBack = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const newHistory = [...prevHistory];
        newHistory.pop();
        const previousStage = newHistory[newHistory.length - 1];

        setCurrentStage(previousStage);

        if (previousStage === "initial") {
          setSelectedService(null);
          setSelectedSubService(null);
          setUserDetails(null);
        } else if (previousStage === "service_selection") {
          setSelectedService(null);
          setSelectedSubService(null);
          setUserDetails(null);
        } else if (previousStage === "sub_service_selection") {
          setSelectedSubService(null);
          setUserDetails(null);
        }

        setMessages((prev) => prev.slice(0, prev.length - 2));

        return newHistory;
      }
      return prevHistory;
    });
  }, []);

  const resetChat = useCallback(() => {
    const resetMessage: ChatMessage = {
      text: "Vamos começar novamente. Por favor, selecione um de nossos serviços:",
      isUser: false,
    };

    setMessages([resetMessage]);
    setCurrentStage("service_selection");
    setSelectedService(null);
    setSelectedSubService(null);
    setUserDetails(null);
    setHistory(["initial", "service_selection"]);
  }, []);

  const chatState = useMemo(
    () => ({
      messages,
      currentStage,
      selectedService,
      selectedSubService,
      userDetails,
      history,
      handleServiceSelect,
      handleSubServiceSelect,
      handleUserInput,
      handleBack,
      resetChat,
    }),
    [
      messages,
      currentStage,
      selectedService,
      selectedSubService,
      userDetails,
      history,
      handleServiceSelect,
      handleSubServiceSelect,
      handleUserInput,
      handleBack,
      resetChat,
    ]
  );

  return chatState;
}
