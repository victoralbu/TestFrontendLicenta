import {useDataStore} from "~/services/dataStorage";

export async function loadLocation() {
    return useFetch(`https://ipapi.co/json/`, {
        pick: ['city']
    }).then(r => {
        useDataStore().location = r.data.value.city;
    });
}