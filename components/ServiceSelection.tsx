"use client";

import { Service, ServiceItem } from "@/lib/services";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ServiceSelectionProps {
  items: (Service | ServiceItem)[];
  onSelect: (item: Service | ServiceItem) => void;
  isCategory?: boolean;
}

export function ServiceSelection({
  items,
  onSelect,
  isCategory = false,
}: ServiceSelectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="my-4 space-y-2"
    >
      {items.map((serviceItem, index) => (
        <motion.div key={index} variants={itemVariants}>
          <button
            onClick={() => onSelect(serviceItem)}
            className="w-full text-left p-4 rounded-xl bg-white border border-gray-200 hover:border-[#8c52ff] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex-1 pr-4">
              <div className="text-gray-800 font-medium">
                {isCategory && "emoji" in serviceItem
                  ? `${serviceItem.emoji} ${serviceItem.name}`
                  : serviceItem.name}
                {"price" in serviceItem && serviceItem.price && (
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    {serviceItem.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    {serviceItem.duration && ` (${serviceItem.duration})`}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {serviceItem.description}
              </p>
            </div>
            <CheckCircle className="h-5 w-5 text-gray-300 group-hover:text-[#8c52ff] transition-colors duration-200 flex-shrink-0" />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}
