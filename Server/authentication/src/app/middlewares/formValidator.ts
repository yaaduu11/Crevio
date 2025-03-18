import { Request, Response, NextFunction } from "express";
import { Messages } from "../../constants/messages";
import { httpStatusCodes } from "../../constants/statusCodes";

export const formValidator = (
    validationSchema: Record<string, { rules: RegExp[]; messages: string[]; optional?: boolean }>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        for (const field in validationSchema) {
            const { rules, messages, optional } = validationSchema[field];
            const value = req.body[field];

            if (!value) {
                if (optional) continue;
                res.status(httpStatusCodes.BAD_REQUEST).json({ error: Messages.INCOMPLETE_FORM });
                return;
            }

            for (let i = 0; i < rules.length; i++) {
                if (!rules[i].test(value)) {
                    res.status(httpStatusCodes.BAD_REQUEST).json({ error: messages[i] });
                    return;
                }
            }
        }
        next();
    };
};
