"use client";

import { ChatMessage } from "@/components/ChatMessage";
import { ServiceSelection } from "@/components/ServiceSelection";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { useChat } from "@/hooks/useChat";
import { servicesData } from "@/lib/services";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ChatInterface() {
  const {
    messages,
    currentStage,
    selectedService,
    selectedSubService,
    userDetails,
    handleServiceSelect,
    handleSubServiceSelect,
    handleUserInput,
    handleBack,
    resetChat,
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      handleUserInput(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl h-[600px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#ff5757] to-[#8c52ff] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStage !== "initial" &&
            currentStage !== "service_selection" && (
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

        {currentStage === "service_selection" && (
          <ServiceSelection
            services={servicesData.map((s) => s.name)}
            onSelect={handleServiceSelect}
          />
        )}

        {currentStage === "sub_service_selection" && selectedService && (
          <ServiceSelection
            services={
              servicesData.find((s) => s.name === selectedService)?.items || []
            }
            onSelect={handleSubServiceSelect}
          />
        )}

        {currentStage === "generate_link" &&
          selectedService &&
          selectedSubService &&
          userDetails && (
            <WhatsAppLink
              service={selectedService}
              subService={selectedSubService}
              userDetails={userDetails}
            />
          )}

        <div ref={messagesEndRef} />
      </div>

      {currentStage === "user_details" && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite seus detalhes e necessidades específicas..."
              className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent resize-none h-16 placeholder-gray-400"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-white rounded-full h-12 w-12 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
