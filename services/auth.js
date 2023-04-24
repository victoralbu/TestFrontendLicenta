import {storeCookie} from "~/services/tokenStorage";
import {formatErrors} from "/services/formatErrors"
import {loadLocation} from "~/services/loadData";

export async function register(payload) {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/register`, {
        method: 'POST', body: payload
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    storeCookie().token = data.value.access_token;

    await loadLocation()

    navigateTo('/');
}

export async function login(payload) {
    let config = useRuntimeConfig();

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/token`, {
        method: 'POST', body: payload
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    storeCookie().token = data.value.access_token;

    await loadLocation()

    navigateTo('/');
}

export function logout() {
    storeCookie().token = null;
    navigateTo('/login');
}

