import {formatErrors} from "~/services/formatErrors";
import {logout} from "~/services/logout";

export async function resetPassword(payload) {
    let config = useRuntimeConfig();

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/auth/reset-password`, {
        method     : 'POST',
        body       : payload,
        credentials: 'include',
    })

    let arrayOfErrors = formatErrors(errors);

    if (arrayOfErrors) return arrayOfErrors;

    await logout()

    navigateTo('/login');
}