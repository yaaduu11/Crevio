export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;
    error?: string;
}

export const sendResponse = <T>(
    res: any,
    statusCode: number,
    success: boolean,
    data?: T,
    error?: string
) => {
    if (data && typeof data === 'object') {
        return res.status(statusCode).json({ success, statusCode, ...data });
    }
    return res.status(statusCode).json({ success, statusCode, data, error });
};
