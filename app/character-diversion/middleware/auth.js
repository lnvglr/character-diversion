export default defineNuxtRouteMiddleware((to, from) => {
  const user = useStrapiUser().value
  if (to.name === "profile" && !user) {
    return navigateTo('/login')
  }
  if (to.name === "login" && user) {
    return navigateTo('/profile')
  }
})