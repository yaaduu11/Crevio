import { passwordRegex } from "./regex";


export const validatePassword = (name: string, value: string, passwords: { password: string }) => {
    let errors = [];

    if (value.trim() === "") {
        errors.push({ field: name, message: "Password cannot be empty." });
    }
    if (!passwordRegex.digit.test(value.trim())) {
        errors.push({ field: name, message: "Password must contain at least one digit." });
    }
    if (!passwordRegex.letter.test(value.trim())) {
        errors.push({ field: name, message: "Password must contain at least one letter." });
    }
    if (!passwordRegex.specialChar.test(value.trim())) {
        errors.push({ field: name, message: "Password must contain at least one special character." });
    }
    if (!passwordRegex.length.test(value.trim())) {
        errors.push({ field: name, message: "Password must be at least 8 characters long." });
    }
    if (name === 'confirmPassword' && value !== passwords.password) {
        errors.push({ field: 'confirmPassword', message: "Passwords do not match." });
    }

    return errors.length > 0 ? errors[0] : { field: '', message: '' };
};
