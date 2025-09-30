import { type Logger, pino } from "pino";

export const logger: Logger = pino({

    levelComparison: "DESC",
    transport: {

        target: "pino-pretty",
        options: {

            colorize: true,
            translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l o",
            ignore: "pid,hostname",

        }

    }

});
