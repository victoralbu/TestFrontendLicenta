let config = useRuntimeConfig()

let apiUrl = config.API_URL;

export async function getMyJobs(post) {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/my-jobs`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
    })

    return data.value;
}
