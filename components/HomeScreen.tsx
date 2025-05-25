"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb, MessageSquareText, Sparkles } from "lucide-react";

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl"
    >
      <div className="text-center mb-8">
        <motion.h1
          className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-[#ff5757] to-[#8c52ff] text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Metamorfose - Assessoria e Consultoria Profissional
        </motion.h1>
        <motion.p
          className="mt-3 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Ingrid Santana
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <ServiceCard
          icon={<Sparkles className="h-8 w-8 text-[#ff5757]" />}
          title="Consultoria e Desenvolvimento Profissional"
          items={[
            "Consultoria Estratégica & Desenvolvimento Profissional",
            "Treinamentos Neurocomportamentais & Oratória",
            "Mentoria e Planejamento de Carreira",
          ]}
        />

        <ServiceCard
          icon={<BookOpen className="h-8 w-8 text-[#a94dff]" />}
          title="Escrita Técnica & Produção Acadêmica"
          items={[
            "Projetos Científicos & Escrita Técnica",
            "Revisão, Relatórios & Documentação Acadêmica",
            "Mapas Mentais, Resumos & Apresentações",
          ]}
        />

        <ServiceCard
          icon={<Lightbulb className="h-8 w-8 text-[#8c52ff]" />}
          title="Ensino, Treinamentos e Transição Profissional"
          items={[
            "Metodologias de Ensino & Aulas Personalizadas",
            "Mentorias Individuais & para Equipes",
            "Transição Acadêmica para o Mercado & Workshops",
          ]}
        />
      </motion.div>

      <motion.div
        className="text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-[#ff5757] to-[#8c52ff] hover:opacity-90 text-white font-medium py-6 px-8 rounded-full text-lg shadow-lg inline-flex items-center gap-2 transition-all duration-300"
        >
          <MessageSquareText className="h-5 w-5" />
          Iniciar Conversa
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Converse com nosso assistente virtual e receba informações diretamente
          no WhatsApp
        </p>
      </motion.div>
    </motion.div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function ServiceCard({ icon, title, items }: ServiceCardProps) {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white/20 ">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#ff5757] to-[#8c52ff] mt-1.5 mr-2 flex-shrink-0"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
