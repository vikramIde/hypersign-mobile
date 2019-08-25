
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Wallet.vue') },
      { path: 'help', component: () => import('pages/Help.vue') },
      { path: 'signtx', component: () => import('pages/Signtx.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Basic.vue'),
    children: [
      { name: 'Login', path: 'login', component: () => import('pages/Auth.vue') },
      { name: 'Register', path: 'register', component: () => import('pages/Auth.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
