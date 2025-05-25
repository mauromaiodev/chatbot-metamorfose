"use client";

import { ChatMessage } from "@/components/ChatMessage";
import { ServiceSelection } from "@/components/ServiceSelection";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { useChat } from "@/hooks/useChat";
import { Service, ServiceItem } from "@/lib/services";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  RotateCcw,
  SendHorizontal,
  SkipForward,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ChatInterface() {
  const {
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
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const [area, setArea] = useState("");
  const [hasDocument, setHasDocument] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (
      currentStage === "conditional_details" &&
      area &&
      hasDocument !== null
    ) {
      handleConditionalDetails(
        area,
        hasDocument,
        inputValue.trim() || undefined
      );
      setArea("");
      setHasDocument(null);
      setInputValue("");
    } else if (currentStage === "additional_info") {
      handleUserInput(inputValue);
      setInputValue("");
    } else if (inputValue.trim()) {
      handleUserInput(inputValue);
      setInputValue("");
    }
  };

  const handleSkip = () => {
    if (currentStage === "additional_info") {
      handleUserInput("");
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isService = (item: Service | ServiceItem): item is Service => {
    return "emoji" in item && "items" in item;
  };

  const isServiceItem = (item: Service | ServiceItem): item is ServiceItem => {
    return !("emoji" in item) || !("items" in item);
  };

  const handleCategorySelection = (item: Service | ServiceItem) => {
    if (isService(item)) {
      handleCategorySelect(item);
    }
  };

  const handleServiceSelection = (item: Service | ServiceItem) => {
    if (isServiceItem(item)) {
      handleServiceSelect(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl h-[600px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#ff5757] to-[#8c52ff] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStage !== "initial" &&
            currentStage !== "category_selection" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
          <h2 className="font-bold text-white text-lg">
            Assistente Metamorfose
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={resetChat}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
              animate={true}
            />
          ))}
        </AnimatePresence>

        {currentStage === "category_selection" && (
          <ServiceSelection
            items={servicesData}
            onSelect={handleCategorySelection}
            isCategory={true}
          />
        )}

        {currentStage === "service_selection" && selectedCategory && (
          <ServiceSelection
            items={selectedCategory.items}
            onSelect={handleServiceSelection}
          />
        )}

        {currentStage === "generate_link" &&
          selectedCategory &&
          selectedService && (
            <WhatsAppLink
              category={selectedCategory.name}
              service={selectedService.name}
              serviceItem={selectedService}
              userDetails={userDetails || {}}
            />
          )}

        <div ref={messagesEndRef} />
      </div>

      {currentStage === "conditional_details" && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-4">
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Qual a área da atividade? (ex.: Biologia, Administração, etc.)"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setHasDocument(true)}
                className={`flex-1 py-2 px-4 rounded-xl border transition-all ${
                  hasDocument === true
                    ? "bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-white border-transparent"
                    : "bg-white border-gray-200 hover:border-[#8c52ff]"
                }`}
              >
                Tenho um documento
              </button>
              <button
                onClick={() => setHasDocument(false)}
                className={`flex-1 py-2 px-4 rounded-xl border transition-all ${
                  hasDocument === false
                    ? "bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-white border-transparent"
                    : "bg-white border-gray-200 hover:border-[#8c52ff]"
                }`}
              >
                Começar do zero
              </button>
            </div>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Se quiser compartilhar mais detalhes, como prazos, formato desejado ou preferências específicas, aproveite o momento! (Limite de 300 caracteres) "
              maxLength={300}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent resize-none h-20 placeholder-gray-400"
            />
            <div className="text-xs text-gray-400 text-right">
              {inputValue.length}/300 caracteres
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!area || hasDocument === null}
              className="w-full bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {currentStage === "additional_info" && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="(Opcional) Digite aqui suas observações..."
              maxLength={300}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent resize-none h-20 placeholder-gray-400"
            />
            <div className="text-xs text-gray-400 text-right">
              {inputValue.length}/300 caracteres
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-1 border-gray-200 text-gray-600 hover:border-[#8c52ff] hover:text-[#8c52ff] rounded-xl py-3 flex items-center justify-center gap-2"
              >
                Pular
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                className="flex-1 bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Continuar
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
