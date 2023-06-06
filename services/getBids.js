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

export async function getMyBids(){
    let {data: data, error: errors} = await useFetch(`${apiUrl}/bids/my-bids`, {
        method: 'post',
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
    })

    return data.value;
}