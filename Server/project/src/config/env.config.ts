export const env = {
    get PORT() {
        return process.env.PORT
    },

    get MONGO_URI() {
        return process.env.MONGO_URI
    },

    get CLOUDINARY_CLOUD_NAME() {
        return process.env.CLOUDINARY_CLOUD_NAME
    },

    get CLOUDINARY_API_KEY() {
        return process.env.CLOUDINARY_API_KEY
    },

    get CLOUDINARY_API_SECRET() {
        return process.env.CLOUDINARY_API_SECRET
    }
}