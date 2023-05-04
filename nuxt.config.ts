export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        API_URL: process.env.API_URL,
        public: {
            API_URL: process.env.API_URL,
        },
    },
    image: {
        // The screen sizes predefined by `@nuxt/image`:
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            '2xl': 1536
        },
    },
    app: {
        head: {
            title: "Worker's",
        }
    },

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
        '@nuxt/image-edge',

    ],

    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        },
        storage: 'cookies'
    },

});
