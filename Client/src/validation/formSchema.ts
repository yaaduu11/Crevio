import { nameRegex, emailRegex, passwordRegex } from "./regex";
import Messages from "../constants/messages";

export const formSchema = {
    name: {
        rules: [nameRegex],
        messages: [Messages.INVALID_NAME]
    },

    email: {
        rules: [emailRegex],
        messages: [Messages.INVALID_EMAIL]
    },

    password: {
        rules: [
            passwordRegex.length,
            passwordRegex.letter,
            passwordRegex.digit,
            passwordRegex.specialChar
        ],
        messages: [
            Messages.PASSWORD_LENGTH,
            Messages.PASSWORD_LETTER,
            Messages.PASSWORD_DIGIT,
            Messages.PASSWORD_SPECIALCHAR
        ]
    }
}