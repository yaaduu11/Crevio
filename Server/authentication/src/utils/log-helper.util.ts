import winstonLogger from '../loggers/wintson.logger';

export const winstonInfo = (message: string, extra?: Record<string, any>) => {    
    winstonLogger.info({ message, ...extra })
}

export const winstonWarn = (message: string, extra?: Record<string, any>) => {
    winstonLogger.warn({ message, ...extra })
}

export const winstonError = (message: string, extra?: Record<string, any>) => {
    winstonLogger.error({ message, ...extra })
}