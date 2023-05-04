// import {getToken} from "~/services/tokenStorage";

import {useDataStore} from "~/services/dataStorage";

export async function getPosts(posts) {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let {data: data, error: errors} = await useFetch(`${apiUrl}/jobs`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
            // 'Authorization': `Bearer ${getToken()}`,
            // 'X-CSRF-TOKEN': useCookie('XSRF-TOKEN')
        },
        params     : {
            'lastPost': posts,
            'city'    : useDataStore().location,
        }
    })

    return data.value;
}
