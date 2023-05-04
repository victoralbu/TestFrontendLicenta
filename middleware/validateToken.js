import {isTokenValid} from "~/services/tokenValidation";

export default defineNuxtRouteMiddleware((to, from) => {

    isTokenValid(to)

});