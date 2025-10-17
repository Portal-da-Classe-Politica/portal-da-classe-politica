export interface TeamMember {
  name: string;
  description: string;
  image: string;
  social?: {
    linkedin?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
  };
}

export const coordenacao: TeamMember[] = [
  {
    name: 'Adriano Codato',
    description:
      'Coordenador do INCT ReDem e Portal da Classe Política. Doutor em Ciência Política (Unicamp).',
    image: '/img/author/AdrianoCodato.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/adriano-codato-24526628/',
      instagram: 'https://www.instagram.com/adrianocodato/',
      email: 'mailto:adrianocodato@gmail.com',
    },
  },
  {
    name: 'Nilton Sainz',
    description:
      'Coordenador Portal da Classe Política e pesquisador do INCT ReDem. Doutorando em Ciência Política (UFPR).',
    image: '/img/author/NiltonSainz.png',
    social: {
      linkedin: 'https://linkedin.com/in/nilton-sainz',
      email: 'mailto:nilton@redem.org.br',
    },
  },
  {
    name: 'Luiz Sebastião K. João Filho',
    description:
      'Coordenador de Dados e Metodologia. Especialista em análise estatística e modelagem de dados políticos.',
    image: '/img/author/LuizSebastiao.png',
    social: {
      linkedin: 'https://linkedin.com/in/luiz-sebastiao',
      email: 'mailto:luiz@redem.org.br',
    },
  },
];

export const desenvolvedores: TeamMember[] = [
  {
    name: 'Karolina Silva',
    description:
      'Desenvolvedora Full-Stack. Especialista em React, Node.js e arquitetura de sistemas. Responsável pelo desenvolvimento técnico do portal.',
    image: '/img/author/karolina.png',
    social: {
      linkedin: 'https://linkedin.com/in/karolina-silva',
      email: 'mailto:karolina@redem.org.br',
    },
  },
  {
    name: 'Maria Santos',
    description:
      'Desenvolvedora Frontend e UX/UI Designer. Especialista em design de interfaces e experiência do usuário para aplicações web.',
    image: '/img/author/maria.png',
    social: {
      linkedin: 'https://linkedin.com/in/maria-santos',
      email: 'mailto:maria@redem.org.br',
    },
  },
];

export const membrosEquipe: TeamMember[] = [
  {
    name: 'Ana Paula Oliveira',
    description:
      'Pesquisadora Junior. Graduada em Ciência Política pela UFRJ. Especialista em análise de dados eleitorais.',
    image: '/img/author/AdrianoCodato.png',
    social: {
      linkedin: 'https://linkedin.com/in/ana-paula-oliveira',
      email: 'mailto:ana@redem.org.br',
    },
  },
  {
    name: 'Carlos Eduardo Lima',
    description:
      'Analista de Dados. Especialista em Python, R e análise estatística aplicada à ciência política.',
    image: '/img/author/NiltonSainz.png',
    social: {
      linkedin: 'https://linkedin.com/in/carlos-lima',
      email: 'mailto:carlos@redem.org.br',
    },
  },
  {
    name: 'Fernanda Costa',
    description:
      'Especialista em Comunicação. Responsável pela divulgação científica e comunicação do projeto.',
    image: '/img/author/karolina.png',
    social: {
      linkedin: 'https://linkedin.com/in/fernanda-costa',
      email: 'mailto:fernanda@redem.org.br',
    },
  },
  {
    name: 'Rafael Mendes',
    description:
      'Pesquisador em Política Comparada. Mestre em Ciência Política pela UFMG. Foco em estudos eleitorais.',
    image: '/img/author/LuizSebastiao.png',
    social: {
      linkedin: 'https://linkedin.com/in/rafael-mendes',
      email: 'mailto:rafael@redem.org.br',
    },
  },
];
