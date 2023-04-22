import {getToken} from "~/services/tokenStorage";

export async function getUser() {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
    })

    return data.value;
}
