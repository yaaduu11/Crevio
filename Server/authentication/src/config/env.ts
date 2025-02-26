
export const env = {
    get PORT() {
        return process.env.PORT
    },

    get MONGO_URI() {
        return process.env.MONGO_URI
    },

    get REDIS_URI() {
        return process.env.REDIS_URI || 'redis://localhost:6379'
    },

    get USER_EMAIL() {
        return process.env.USER_EMAIL
    },

    get USER_PASSWORD() {
        return process.env.USER_PASSWORD
    },

    get JWT_ACCESS_TOKEN_SECRET() {
        return process.env.JWT_ACCESS_TOKEN_SECRET
    },

    get JWT_REFRESH_TOKEN_SECRET() {
        return process.env.JWT_REFRESH_TOKEN_SECRET
    }
}