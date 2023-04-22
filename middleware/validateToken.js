import {getToken, storeCookie} from "~/services/tokenStorage";

export default defineNuxtRouteMiddleware((to, from) => {
    let validation = async function isTokenValid() {
        let config = useRuntimeConfig();

        let apiUrl = config.API_URL;

        let {data: data, error: error} = await useFetch(`${apiUrl}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },

            onRequestError({request, options, error}) {
                console.log(request)
            },
            onResponseError({request, response, options}) {
                if (response.status === 401) {
                    storeCookie().token = null;
                    return navigateTo('/login');
                }
            },
        })

    }

    validation();

});