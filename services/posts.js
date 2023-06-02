import {formatErrors} from "~/services/formatErrors";

export async function createPost(payload) {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let formData = new FormData();

    formData.append('title', payload.title)
    formData.append('description', payload.description)
    formData.append('level', payload.level)
    formData.append('city', payload.city)
    formData.append('address', payload.address)
    formData.append('urgency', payload.urgency)
    formData.append('group_id', payload.group_id)

    for (let i = 0; i < payload.images.length; i++) {
        formData.append(`images${i}`, payload.images[i])
    }

    let {data: data, error: errors} = await useFetch(`${apiUrl}/jobs`, {
        method : 'POST', credentials: 'include',
        headers: {
            'Accept': ['application/json'],
        },
        body   : formData
    })

    let arrayOfErrors = formatErrors(errors);

}