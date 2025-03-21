

export const env = {
    get PORT() {
        return process.env.PORT
    },

    get MONGO_URI() {
        return process.env.MONGO_URI
    },

    get STRIPE_SECRET_KEY() {
        return process.env.STRIPE_SECRET_KEY
    },

    get STRIPE_WEBHOOK_SECRET() {
        return process.env.STRIPE_WEBHOOK_SECRET
    }
}