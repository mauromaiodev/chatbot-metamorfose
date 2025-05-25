export interface Service {
  name: string;
  emoji: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  name: string;
  description: string;
  price?: number;
  conditional?: boolean;
  maxPages?: number;
  maxSlides?: number;
  maxConcepts?: number;
  maxQuestions?: number;
  duration?: string;
}

export const servicesData: Service[] = [
  {
    name: "Acadêmicos",
    emoji: "📚",
    description:
      "Pesquisas, resumos científicos, TCC, mapas mentais, apresentações",
    items: [
      {
        name: "Revisão e avaliação",
        description: "Feedback detalhado sobre textos acadêmicos",
        conditional: true,
      },
      {
        name: "Análise completa com relatório",
        description: "Diagnóstico do conteúdo com sugestões de melhoria",
        conditional: true,
      },
      {
        name: "Edições de texto",
        description: "Ajustes na estrutura, gramática e clareza",
        conditional: true,
      },
      {
        name: "Edições e inclusões avançadas",
        description: "Revisão profunda com adição de informações",
        conditional: true,
      },
      {
        name: "TCC 1",
        description: "Projeto de TCC",
        conditional: true,
        maxPages: 25,
      },
      {
        name: "TCC 2",
        description: "Desenvolvimento de TCC",
        conditional: true,
        maxPages: 25,
      },
      {
        name: "TCC 1 e 2",
        description: "Projeto + desenvolvimento do TCC",
        conditional: true,
      },
      {
        name: "Mapas Mentais",
        description: "Organização de até 5 conceitos principais por mapa",
        conditional: true,
        maxConcepts: 5,
      },
      {
        name: "Resumos científicos com ideias adicionais",
        description: "Sínteses detalhadas até 5 páginas",
        conditional: true,
        maxPages: 5,
      },
      {
        name: "Apresentações de seminários",
        description: "Produção de até 15 slides",
        conditional: true,
        maxSlides: 15,
      },
      {
        name: "Relatórios de estágio",
        description: "Elaboração de relatórios acadêmicos de até 10 páginas",
        conditional: true,
        maxPages: 10,
      },
      {
        name: "Relatórios técnicos",
        description:
          "Documentação analítica com base em dados de até 10 páginas",
        conditional: true,
        maxPages: 10,
      },
      {
        name: "Pesquisas científicas",
        description: "Organização e estruturação de pesquisas acadêmicas",
        conditional: true,
        maxPages: 10,
      },
    ],
  },
  {
    name: "Profissionais",
    emoji: "💼",
    description: "Currículo, LinkedIn, treinamentos, outros",
    items: [
      {
        name: "Treinamento para entrevista",
        description: "Simulação e feedback sobre postura e discurso",
        price: 49.0,
        duration: "60 min",
      },
      {
        name: "Treinamento de oratória",
        description: "Desenvolvimento de confiança e técnicas de apresentação",
        price: 58.0,
        duration: "60 min",
      },
      {
        name: "Avaliação de currículo",
        description: "Análise detalhada com sugestões de melhoria",
        conditional: true,
        maxPages: 2,
      },
      {
        name: "Ajustes no currículo",
        description: "Reformulação completa + carta de apresentação",
        conditional: true,
        maxPages: 2,
      },
      {
        name: "Avaliação de LinkedIn",
        description: "Revisão estratégica para otimizar o perfil profissional",
        price: 39.0,
      },
      {
        name: "Ajustes no LinkedIn",
        description: "Edição direta no perfil",
        price: 48.0,
      },
      {
        name: "Avaliação de currículo e LinkedIn",
        description: "Diagnóstico combinado para aprimoramento profissional",
        conditional: true,
        maxPages: 2,
      },
      {
        name: "Ajustes de currículo e LinkedIn",
        description:
          "Reformulação completa com carta de apresentação personalizada",
        conditional: true,
        maxPages: 2,
      },
    ],
  },
  {
    name: "Comunicação",
    emoji: "🎤",
    description: "Apresentação, oratória, palestras, workshops",
    items: [
      {
        name: "Apresentação estruturada em PowerPoint",
        description: "Criação de slides organizados e personalizados",
        price: 95.0,
      },
      {
        name: "Apresentação + técnicas de oratória",
        description: "Orientação para confiança e domínio ao falar em público",
        price: 145.0,
      },
      {
        name: "Palestra",
        description: "Apresentação estruturada sobre temas específicos",
        price: 95.0,
        duration: "por hora",
      },
      {
        name: "Workshop",
        description: "Treinamento prático para aplicação de técnicas",
        price: 120.0,
      },
    ],
  },
  {
    name: "Ensino",
    emoji: "🎓",
    description: "Metodologias de ensino, apoio em sala, pesquisas científicas",
    items: [
      {
        name: "Desenvolvimento de metodologias",
        description:
          "Apoio na criação e aprimoramento de estratégias de ensino",
        price: 58.0,
      },
      {
        name: "Apoio em sala de aula",
        description:
          "Assistência na condução de atividades e organização de conteúdo",
        price: 77.0,
        duration: "por hora",
      },
      {
        name: "Elaboração de questões específicas",
        description: "Criação de exercícios e avaliações",
        conditional: true,
        maxQuestions: 5,
      },
      {
        name: "Pesquisas científicas",
        description: "Suporte na coleta e estruturação de dados acadêmicos",
        conditional: true,
      },
    ],
  },
];
