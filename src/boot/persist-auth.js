// import { Cookies } from 'quasar'
// import createPersistedState from 'vuex-persistedstate'

// export default async ({ app, router, store, Vue }) => {
//   const cookies = Cookies
//   console.log(store.state)
//   createPersistedState({
//     paths: [
//       'wallet',
//       'user'
//     ],
//     storage: {
//       getItem: key => JSON.stringify(cookies.get(key)),
//       setItem: (key, value) => cookies.set(key, value),
//       removeItem: key => cookies.remove(key)
//     }
//   })(store)
// }
