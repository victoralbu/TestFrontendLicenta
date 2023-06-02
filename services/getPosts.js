import {useDataStore} from "~/services/dataStorage";

let config = useRuntimeConfig()

let apiUrl = config.API_URL;

export async function getPosts(posts) {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/jobs`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
        params     : {
            'lastPost': posts,
            'city'    : useDataStore().location,
        }
    })

    return data.value;
}


export async function getMyPosts(posts) {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/myPosts`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
        params     : {
            'lastPost': posts,
        }
    })

    return data.value;
}

export async function getGroupPosts(posts, group) {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/groupPosts`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
        params     : {
            'lastPost': posts,
            'group': group,
        }
    })

    return data.value;
}