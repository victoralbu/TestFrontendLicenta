import {getToken} from "~/services/tokenStorage";
import {getData} from "~/services/dataStorage";

export default defineNuxtRouteMiddleware((to, from) => {

    if ((to.fullPath !== '/login' && to.fullPath !== '/register') && (getToken() === null || getData() === null))
        return navigateTo('/login');

    if ((to.fullPath === '/login' || to.fullPath === '/register') && (getToken() !== null && getData() !== null))
        return navigateTo('/');

})