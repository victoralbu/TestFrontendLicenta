let config = useRuntimeConfig()

let apiUrl = config.API_URL;

export async function getPost(post) {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/jobs/${post}`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
    })

    return data.value;
}