import {formatErrors} from "/services/formatErrors"

export async function register(payload) {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/register`, {
        method: 'POST', body: payload, credentials: 'include',
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    localStorage.setItem('authed','true')

    navigateTo('/');
}

export async function login(payload) {
    let config = useRuntimeConfig();

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/token`, {
        method: 'POST', body: payload, credentials: 'include',
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    localStorage.setItem('authed','true')

    navigateTo('/');
}

export function logout() {
    storeCookie().token = null;
    navigateTo('/login');
}

