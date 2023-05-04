import {useDataStore} from "~/services/dataStorage";

export async function loadLocation() {
    return useFetch(`https://ipapi.co/json/`, {
        pick: ['city']
    }).then(r => {
        useDataStore().location = r.data.value.city;
    });
}

export async function loadUserInfo() {
    let apiUrl = useRuntimeConfig().API_URL;

    return useFetch(`${apiUrl}/me`, {
        method: 'GET', credentials: 'include', headers: {
            'Accept': 'application/json',
        }
    }).then(r => {
        if (!r.error.value) {
            let data                    = r.data.value;
            useDataStore().name         = data.name
            useDataStore().email        = data.email
            useDataStore().phone_number = data.phone_number
            useDataStore().jobs_done    = data.jobs_done
            useDataStore().rating       = data.rating
            useDataStore().ratings_nr   = data.ratings_nr
        }

    });
}
