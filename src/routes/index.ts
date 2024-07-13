export const routes = {
  home: '/',
  consult: '/consulta',
  consultList: [],
  projections: '/segunda-camada',
  candidates: '/perfil-candidato',
  candidate: (id: string) => `/perfil-candidato/${id}`,
  about: '/sobre',
  blog: '/blog',
  blogPost: (id: string) => `/blog/${id}`,
  elections2024: '/eleicao-2024',
  support: '/atendimento',
};
