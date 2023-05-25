import {useDataStore} from "~/services/dataStorage";

export async function logout() {
    let config = useRuntimeConfig();

    let apiUrl = config.API_URL;

    await   useFetch(`${apiUrl}/auth/logout`, {
        method     : 'POST',
        credentials: 'include',
    })

    localStorage.setItem('authed','false');

    navigateTo('/login')
}