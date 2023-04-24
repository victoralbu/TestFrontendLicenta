import {ref} from "vue";
import {defineStore} from "pinia";
export const useDataStore = defineStore('data', () => {

    let location = ref()

    return {location}
}, {
    persist: true,
})

export const getData = function () {
    try {
        return useCookie('data').value.location;
    } catch {
        return null;
    }
}
