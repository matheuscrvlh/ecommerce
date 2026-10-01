export const ROUTES = {
  home: '/',
  catalog: '/produtos',
  register: '/cadastro',
  admin: {
    root: '/admin',
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    registrations: '/admin/cadastros',
    users: '/admin/usuarios',
    settings: '/admin/configuracoes',
  },
} as const
