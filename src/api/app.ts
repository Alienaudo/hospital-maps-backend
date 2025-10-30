import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";
import { firebase } from "../../firebaseConfig.js";
import { logger } from "../logger.js";
import { buildApp } from "./server.js";
import "newrelic";

const HOST: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.PORT) || 3000;

const app: FastifyInstance = buildApp(prisma, firebase);

try {

    app.listen({

        host: HOST,
        port: PORT

    });

} catch (error: unknown) {

    if (app.log) {

        app.log.error(error);

    };

    logger.error(error);

    process.exit(1);

};
