import fastify, { type FastifyError, type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import type { ReplyGenericInterface } from "fastify/types/reply.js";
import type { App } from "firebase-admin/app";
import type { PrismaClient } from "../generated/client.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import "dotenv/config";
import { UserRoutePlugin } from "../routes/User.Routes.js";

export const buildApp = (

    prismaClient: PrismaClient,
    firebaseInstance: App

): FastifyInstance => {

    const app: FastifyInstance = fastify({

        logger: {

            levelComparison: "DESC",
            transport: {

                target: "pino-pretty",
                options: {

                    colorize: true,
                    translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l o",
                    ignore: "pid,hostname",

                },

            }
        }

    });

    app.setErrorHandler((

        error: FastifyError,
        _request: FastifyRequest,
        reply: FastifyReply

    ): FastifyReply<ReplyGenericInterface> => {

        app.log.error(error);

        return reply
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({

                error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                message: error.message

            });

    });

    app.register(cookie, {

        secret: process.env.JWT_SECRET || "MySecretForJWT",
        hook: "preHandler",

    });

    app.register(rateLimit, {

        global: false,

    });

    app.decorate("prisma", prismaClient);
    app.decorate("firebase", firebaseInstance);

    app.register(UserRoutePlugin, {

        prefix: "/v1/api/user",

    });

    return app;

};

