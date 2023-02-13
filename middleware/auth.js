import {getToken} from "~/services/storeToken";

export default defineNuxtRouteMiddleware((to, from) => {

    if ((to.fullPath !== '/login' && to.fullPath !== '/register') && getToken() === null)
        return navigateTo('/login');

    if ((to.fullPath === '/login' || to.fullPath === '/register') && getToken() !== null) {
        return navigateTo('/');
    }
})