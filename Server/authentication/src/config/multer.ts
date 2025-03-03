import multer from "multer";
import { httpStatusCodes } from "../constants/statusCodes";
import { Messages } from "../constants/messages";
import { generateHttpError } from "../utils/httpError";

const allowedFormats = ['jpg', 'jpeg', 'png', 'webp']
const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: {fileSize:5 *1024 *1024},
    fileFilter:(req, file, callbaack) => {
        if(!allowedFormats.includes(file.mimetype.split('/')[1])) {
            return callbaack(generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INVALID_FILE_FORMAT))
        }
        callbaack(null, true)
    }
})