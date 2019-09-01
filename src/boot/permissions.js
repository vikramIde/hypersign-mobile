import NProgress from 'nprogress' // Progress

export default ({ router, store, Vue }) => {
  const whiteList = ['/auth/login', '/auth/register'] // whitelist routes

  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (store.state.wallet.address !== '') {
      if (to.path === '/auth/login') {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/auth/login')
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done() // 结束Progress
  })
}
