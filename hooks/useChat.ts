"use client";

import { useState, useEffect } from 'react';

type ChatStage = 
  | 'initial' 
  | 'service_selection' 
  | 'sub_service_selection' 
  | 'user_details' 
  | 'generate_link';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStage, setCurrentStage] = useState<ChatStage>('initial');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatStage[]>(['initial']);

  // Initialize chat
  useEffect(() => {
    const initialMessage: ChatMessage = {
      text: "Olá! Bem-vindo à Metamorfose. Como posso ajudar você hoje? Por favor, selecione um de nossos serviços para começar.",
      isUser: false
    };
    
    setMessages([initialMessage]);
    setTimeout(() => {
      setCurrentStage('service_selection');
      setHistory(['initial', 'service_selection']);
    }, 1000);
  }, []);

  // Handle service selection
  const handleServiceSelect = (service: string) => {
    const userMessage: ChatMessage = {
      text: service,
      isUser: true
    };
    
    const botResponse: ChatMessage = {
      text: `Ótima escolha! Agora, por favor selecione o tipo específico de ${service.toLowerCase()} que você está procurando:`,
      isUser: false
    };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setSelectedService(service);
    setCurrentStage('sub_service_selection');
    setHistory(prev => [...prev, 'sub_service_selection']);
  };

  // Handle sub-service selection
  const handleSubServiceSelect = (subService: string) => {
    const userMessage: ChatMessage = {
      text: subService,
      isUser: true
    };
    
    const botResponse: ChatMessage = {
      text: "Perfeito! Agora, por favor descreva brevemente o que você precisa, incluindo qualquer detalhe específico que queira compartilhar:",
      isUser: false
    };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setSelectedSubService(subService);
    setCurrentStage('user_details');
    setHistory(prev => [...prev, 'user_details']);
  };

  // Handle user input (details)
  const handleUserInput = (input: string) => {
    const userMessage: ChatMessage = {
      text: input,
      isUser: true
    };
    
    const botResponse: ChatMessage = {
      text: "Obrigado por compartilhar seus detalhes. Preparei um link para o WhatsApp onde podemos continuar nossa conversa e fornecer as informações que você precisa.",
      isUser: false
    };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setUserDetails(input);
    setCurrentStage('generate_link');
    setHistory(prev => [...prev, 'generate_link']);
  };

  // Handle back button
  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current stage
      const previousStage = newHistory[newHistory.length - 1];
      
      setCurrentStage(previousStage);
      setHistory(newHistory);
      
      // Reset relevant state based on where we're going back to
      if (previousStage === 'initial') {
        setSelectedService(null);
        setSelectedSubService(null);
        setUserDetails(null);
      } else if (previousStage === 'service_selection') {
        setSelectedService(null);
        setSelectedSubService(null);
        setUserDetails(null);
      } else if (previousStage === 'sub_service_selection') {
        setSelectedSubService(null);
        setUserDetails(null);
      }
      
      // Remove last two messages (user selection and bot response)
      setMessages(prev => prev.slice(0, prev.length - 2));
    }
  };

  // Reset chat
  const resetChat = () => {
    const initialMessage: ChatMessage = {
      text: "Vamos começar novamente. Por favor, selecione um de nossos serviços:",
      isUser: false
    };
    
    setMessages([initialMessage]);
    setCurrentStage('service_selection');
    setSelectedService(null);
    setSelectedSubService(null);
    setUserDetails(null);
    setHistory(['initial', 'service_selection']);
  };

  return {
    messages,
    currentStage,
    selectedService,
    selectedSubService,
    userDetails,
    handleServiceSelect,
    handleSubServiceSelect,
    handleUserInput,
    handleBack,
    resetChat
  };
}