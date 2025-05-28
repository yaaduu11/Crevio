
export const env = {
    get PORT() {
        return process.env.PORT
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
    },

    get JWT_ACCESS_TOKEN_SECRET() {
        return process.env.JWT_ACCESS_TOKEN_SECRET
    },

    get JWT_REFRESH_TOKEN_SECRET() {
        return process.env.JWT_REFRESH_TOKEN_SECRET
    },

    get CLOUDINARY_CLOUD_NAME() {
        return process.env.CLOUDINARY_CLOUD_NAME
    },

    get CLOUDINARY_API_KEY() {
        return process.env.CLOUDINARY_API_KEY
    },

    get CLOUDINARY_API_SECRET() {
        return process.env.CLOUDINARY_API_SECRET
    },

    get LOKI_HOST() {
        return process.env.LOKI_HOST
    },

    get SERVICE_NAME() {
        return process.env.SERVICE_NAME
    },

    get AWS_ACCESS_KEY_ID() {
        return process.env.AWS_ACCESS_KEY_ID
    },

    get AWS_SECRET_ACCESS_KEY() {
        return process.env.AWS_SECRET_ACCESS_KEY
    },

    get AWS_REGION() {
        return process.env.AWS_REGION
    },

    get AWS_BUCKET_NAME() {
        return process.env.AWS_BUCKET_NAME
    },

    get IMAGE_ACCESS_SECRET() {
        return process.env.IMAGE_ACCESS_SECRET
    }
}