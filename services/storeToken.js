import {defineStore} from 'pinia'

export const storeCookie = defineStore('token', {
    state: () => {
        return {
            token: ''
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
            persist: true,
        }),
    },
})

export const getToken = function () {
    try {
        return useCookie('token').value.token;
    } catch {
        return null;
    }
}

