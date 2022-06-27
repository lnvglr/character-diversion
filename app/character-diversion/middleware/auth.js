export default defineNuxtRouteMiddleware((to, from) => {
  const user = useStrapiUser().value
  if (to === "profile" && !user) {
    return navigateTo('/login')
  }
  if (to === "login" && user) {
    return navigateTo('/profile')
  }
  return navigateTo(to)
})