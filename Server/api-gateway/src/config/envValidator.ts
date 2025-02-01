import dotenv from 'dotenv'

dotenv.config()

export const env = {
    get PORT() {
        return process.env.PORT
    },

    get AUTH() {
        return process.env.AUTH
    },

    get CLIENT_PORT() {
        return process.env.CLIENT_PORT
    }
}

export function envValidator() {
    if(!env.PORT) {
        throw new Error('PORT is not found in env')
    }

    if(!env.AUTH){
        throw new Error("AUTH is not found in env")
    }

    if(!env.CLIENT_PORT) {
        throw new Error('CLIENT PORT is not found in env')
    }
}
