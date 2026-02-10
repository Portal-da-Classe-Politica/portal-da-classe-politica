export const consultSearchParam = {
  CandidateProfile: 'CandidateProfile',
  ElectionResult: 'ElectionResult',
  Financing: 'Financing',
};

export const consultDimensions = {
  CandidateProfile: 'candidates',
  ElectionResult: 'elections',
  Financing: 'donations',
};

export const routes = {
  home: '/',

  consult: '/consulta',
  consultCandidateProfile: `/consulta?consulta=${consultSearchParam.CandidateProfile}`,
  consultElectionResult: `/consulta?consulta=${consultSearchParam.ElectionResult}`,
  consultFinancing: `/consulta?consulta=${consultSearchParam.Financing}`,

  consultList: [],
  projections: '/segunda-camada',
  candidates: '/perfil-candidato',
  cruzamentos: '/cruzamentos',
  candidate: (id: string) => `/perfil-candidato/${id}`,
  about: '/sobre',
  // Updated to external WordPress blog
  blog: process.env.NEXT_PUBLIC_BLOG_URL || '/blog',
  documentation: '/documentacao',
  // Updated to external WordPress blog post
  blogPost: (id: string) => `${process.env.NEXT_PUBLIC_BLOG_URL || '/blog'}/?p=${id}`,

  elections2024: '/eleicao-2024',
  support: '/atendimento',
  aboutCrossing: '/sobre-cruzamentos',
  team: '/equipe',

  // TODO: Old internal blog routes - kept for backward compatibility
  // These can be removed after migration is complete
  // blogInternal: '/news',
  // blogPostInternal: (id: string) => `/news/${id}`,
};
