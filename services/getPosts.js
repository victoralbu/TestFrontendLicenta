import {getToken} from "~/services/tokenStorage";

export async function getPosts(posts) {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/jobs`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        params: {
            'lastPost': posts
        }
    })

    return data.value;
}
