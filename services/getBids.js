let config = useRuntimeConfig()

let apiUrl = config.API_URL;

export async function getBids(post) {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/bids/${post}`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
    })

    return data.value;
}