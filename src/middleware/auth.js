export default function ({store, redirect, route}) {
  const userIsLoggedIn = !!store.state.auth.user
  const urlRequiresAuth = /^\/profile(\/|$)/.test(route.fullPath) || /^\/(\/|$)/.test(route.fullPath)
  const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath) || /^\/register(\/|$)/.test(route.fullPath)
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect('/login')
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect('/')
  }
  return Promise.resolve()
}
