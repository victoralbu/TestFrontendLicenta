export async function isTokenValid(to) {
    let config = useRuntimeConfig();

    let apiUrl = config.API_URL;

    let {data: data, error: error} = await useFetch(`${apiUrl}/me`, {
        method: 'GET', credentials: 'include', headers: {
            'Accept': 'application/json',
        },

        onRequestError({request, options, error}) {
            console.log(request)
        },

        onResponseError({request, response, options}) {
            if (response.status === 401) {
                localStorage.setItem('authed', 'false')
                let path = to.fullPath === '/register' ? '/register' : '/login';
                return navigateTo(path);
            }
        },
    })
    if (data.value !== null) localStorage.setItem('authed', 'true')

    return true;
}