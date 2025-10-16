import { destination, type Logger, pino } from "pino";
import "dotenv/config";

export const logger: Logger = pino({

    levelComparison: "DESC",
    level: process.env.PINO_LOG_LEVEL || "debug",
    transport: {

        target: "pino-pretty",
        options: {

            colorize: true,
            translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l o",
            ignore: "pid,hostname",

        },

    },

}, destination({

    dest: "./logs",
    sync: false

}));
