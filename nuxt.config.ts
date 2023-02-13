export default defineNuxtConfig({
    runtimeConfig: {
        API_URL: process.env.API_URL,
        public: {
            API_URL: process.env.API_URL,
        },
    },

    // builder: 'webpack',

    modules: [
        '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
        '@pinia-plugin-persistedstate/nuxt',

    ],

    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        },
        storage: 'cookies'
    },

});
