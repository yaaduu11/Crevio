
export const env = {
    get PORT() {
        return process.env.PORT!
    },

    get MONGO_URI() {
        return process.env.MONGO_URI
    },

    get REDIS_URI() {
        return process.env.REDIS_URI
    },

    get USER_EMAIL() {
        return process.env.USER_EMAIL
    },

    get USER_PASSWORD() {
        return process.env.USER_PASSWORD
    }
}