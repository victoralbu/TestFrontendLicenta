export default defineNuxtRouteMiddleware((to, from) => {
        if (localStorage.getItem('authed') === 'true' && (to.fullPath === '/login' || to.fullPath === '/register'))
            return navigateTo('/')
});