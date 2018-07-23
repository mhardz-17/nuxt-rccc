/* nuxt.config.js */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/<repository-name>/'
    }
} : {}

module.exports = {
    ...routerBase
}

const webpack = require('webpack')

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'rccc',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Resistor Color Code Calculator'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        '~/css/main.css'
    ],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }

        },
        vendor: ['jquery', 'bootstrap'],

        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery',
                '_': 'lodash'
                // ...etc.
            })
        ],
        performance: {
            hints: false
        },
    },
    // plugins: ['bootstrap/dist/js/bootstrap.min.js']
}

