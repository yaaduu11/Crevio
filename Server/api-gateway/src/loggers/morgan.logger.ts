import morgan from "morgan";
import winstonLogger from "./wintson.logger";

const morganLogger = morgan('short', {
    stream: {
        write: (message) => winstonLogger.info(message.trim())
    }
})

export default morganLogger