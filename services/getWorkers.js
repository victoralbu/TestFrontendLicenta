let config = useRuntimeConfig()

let apiUrl = config.API_URL;

export async function getWorkers(){
    let {data: data, error: errors} = await useFetch(`${apiUrl}/my-workers`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
    })

    return data.value;
}