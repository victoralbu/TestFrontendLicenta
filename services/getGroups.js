let config = useRuntimeConfig()

let apiUrl = config.API_URL;

export default async function getGroups() {
    let {data: data, error: errors} = await useFetch(`${apiUrl}/groups`, {
        credentials: 'include',
        headers    : {
            'Content-Type': 'application/json',
            'Accept'      : 'application/json',
        },
    })

    return data.value;
}