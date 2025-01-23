
export const env = {
    get PORT() {
        return process.env.PORT!;
    },

    get REDIS_URI() {
        return process.env.REDIS_URI
    }
}