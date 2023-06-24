import {ref} from "vue";
import {defineStore} from "pinia";

export const useDataStore = defineStore('data', () => {

    let location     = ref('Enter a location')
    let id           = ref()
    let name         = ref()
    let email        = ref()
    let phone_number = ref()
    let jobs_done    = ref()
    let rating       = ref()
    let ratings_nr   = ref()
    let verified     = ref()


    return {location, id, name, email, phone_number, jobs_done, rating, ratings_nr, verified}
}, {
    persist: {
        storage: persistedState.localStorage,
    }
})
