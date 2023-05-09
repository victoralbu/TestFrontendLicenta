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

    for (let i = 0; i < payload.images.length; i++) {
        formData.append(`images${i}`, payload.images[i])
    }

    let {data: data, error: errors} = await useFetch(`${apiUrl}/jobs`, {
        method : 'POST', credentials: 'include',
        headers: {
            // 'Content-Type': ['application/json', 'multipart/form-data'],
            'Accept': ['application/json'],
            //     'Authorization': `Bearer ${getToken()}`,
        },
        body   : formData
    })

    let arrayOfErrors = formatErrors(errors);

}