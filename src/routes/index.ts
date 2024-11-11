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
  candidate: (id: string) => `/perfil-candidato/${id}`,
  about: '/sobre',
  blog: '/blog',
  blogPost: (id: string) => `/blog/${id}`,
  elections2024: '/eleicao-2024',
  support: '/atendimento',
  aboutCrossing: '/sobre-cruzamentos',
};
