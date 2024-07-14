export const consultSearchParam = {
  CandidateProfile: 'CandidateProfile',
  ElectionResult: 'ElectionResult',
  PartyFiliation: 'PartyFiliation',
  Financing: 'Financing',
  ElectoralMaps: 'ElectoralMaps',
  ElectoralResearch: 'ElectoralResearch',
};

export const routes = {
  home: '/',

  consult: '/consulta',
  consultCandidateProfile: `/consulta?consulta=${consultSearchParam.CandidateProfile}`,
  consultElectionResult: `/consulta?consulta=${consultSearchParam.ElectionResult}`,
  consultPartyFiliation: `/consulta?consulta=${consultSearchParam.PartyFiliation}`,
  consultFinancing: `/consulta?consulta=${consultSearchParam.Financing}`,
  consultElectoralMaps: `/consulta?consulta=${consultSearchParam.ElectoralMaps}`,
  consultElectoralResearch: `/consulta?consulta=${consultSearchParam.ElectoralResearch}`,

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
