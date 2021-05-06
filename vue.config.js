function isDev() {
    return process.env.NODE_ENV === 'development'
}

function isProd() {
    return process.env.NODE_ENV === 'production'
}

module.exports = {
    devServer: {
        port: 8082,
        proxy: isProd() ? null : process.env.VUE_APP_BACKEND_URL,
    },
}
