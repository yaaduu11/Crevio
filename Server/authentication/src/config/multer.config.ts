import multer from "multer";
import { httpStatusCodes } from "../constants/status-codes.constant";
import { Messages } from "../constants/message.constant";
import { generateHttpError } from "../utils/http-error.util";

const allowedFormats = ['jpg', 'jpeg', 'png', 'webp']
const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter:(req, file, callback) => {
        if(!allowedFormats.includes(file.mimetype.split('/')[1])) {
            return callback(generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INVALID_FILE_FORMAT))
        }
        callback(null, true)
    }
})