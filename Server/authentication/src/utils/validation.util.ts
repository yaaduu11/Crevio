import { nameRegex, emailRegex, passwordRegex } from "./regex.util";
import { Messages } from "../constants/message.constant";

const signinValidation = {
    email: {
      rules: [emailRegex],
      messages: [Messages.INVALID_EMAIL],
    },
    password: {
      rules: [
        passwordRegex.length,
        passwordRegex.letter,
        passwordRegex.digit,
        passwordRegex.specialChar,
      ],
      messages: [
        Messages.PASSWORD_LENGTH,
        Messages.PASSWORD_LETTER,
        Messages.PASSWORD_DIGIT,
        Messages.PASSWORD_SPECIALCHAR,
      ],
    },
};

const signupValidation = {
    name: {
        rules: [nameRegex],
        messages: [Messages.INVALID_NAME] 
    },
    email: {
        rules: [emailRegex],
        messages: [Messages.INVALID_EMAIL],
      },
    password: {
        rules: [
            passwordRegex.length,
            passwordRegex.letter,
            passwordRegex.digit,
            passwordRegex.specialChar,
        ],
        messages: [
            Messages.PASSWORD_LENGTH,
            Messages.PASSWORD_LETTER,
            Messages.PASSWORD_DIGIT,
            Messages.PASSWORD_SPECIALCHAR,
        ],
    },
}

export {
    signinValidation, 
    signupValidation 
}