import morgan from "morgan";
import winstonLogger from "./wintson.logger";
import express from 'express';

// const morganLogger = morgan('short', {
//     stream: {
//         write: (message) => winstonLogger.info(message.trim())
//     }
// })


const morganLogger = morgan((tokens, req, res) => {
    const request = req as express.Request;

    return JSON.stringify({
        ip: request.ip,
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: parseFloat(tokens['response-time'](req, res) || '0'),
        timestamp: new Date().toISOString()
    });
}, {
    stream: {
        write: (message) => {
            const data = JSON.parse(message);
            winstonLogger.info(data);
        }
    }
});

export default morganLogger