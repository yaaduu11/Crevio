import { env } from "../config";
import winston from "winston";
import LokiTransport from "winston-loki";

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: env.SERVICE_NAME },
    transports: [
        new winston.transports.Console(),
        new LokiTransport({
            host: env.LOKI_HOST!,
            labels: { job: env.SERVICE_NAME },
            json: true,
            batching: false,
            interval: 5000,
            format: winston.format.json(),
        }),
    ],
})

export default winstonLogger