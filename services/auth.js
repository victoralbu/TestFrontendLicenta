import {formatErrors} from "/services/formatErrors"

let config = useRuntimeConfig();

let apiUrl = config.API_URL;

export async function register(payload) {

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/register`, {
        method: 'POST', body: payload, credentials: 'include',
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    localStorage.setItem('authed','true')

    navigateTo('/');
}

export async function login(payload) {

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/token`, {
        method: 'POST', body: payload, credentials: 'include',
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    localStorage.setItem('authed','true')

    navigateTo('/');
}

export async function forgotPassword(payload) {
    useFetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST', body: payload,
    })
}

