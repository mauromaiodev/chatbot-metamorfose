"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  animate?: boolean;
}

export function ChatMessage({
  message,
  isUser,
  animate = false,
}: ChatMessageProps) {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={animate ? "hidden" : undefined}
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
        style={{ whiteSpace: "pre-line" }}
      >
        {message.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            {index < message.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
