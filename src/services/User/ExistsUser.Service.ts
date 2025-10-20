import type { Auth, UserRecord } from "firebase-admin/auth";
import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";
import { PrismaClientKnownRequestError } from "../../generated/internal/prismaNamespace.js";

export class ExistsUserService {

    private readonly prisma: PrismaClient;
    private readonly auth: Auth;

    constructor(prisma: PrismaClient, auth: Auth) {

        this.prisma = prisma;
        this.auth = auth;

    };

    public exec = async (

        request: FastifyRequest<{

            Params: { uid: string },

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const { uid } = request.params;

            if (!uid) {

                return reply
                    .status(StatusCodes.BAD_REQUEST)
                    .send({

                        error: "Attribute 'uid' must be informed",

                    });

            };

            const firebaseUser: UserRecord = await this.auth
                .getUser(uid)
                .catch(problem => {

                    logger.error(`Firebase lookup error: ${problem}`);

                    return reply
                        .status(StatusCodes.NOT_FOUND)
                        .send({

                            message: "Usuário não encontrado no Firebase",

                        });

                });

            const existInDB = await this.prisma.user
                .findUniqueOrThrow({

                    where: { firebaseId: firebaseUser.uid },
                    select: { updatedAt: true },

                });

            return reply
                .status(StatusCodes.OK)
                .headers({

                    "last-modified": existInDB.updatedAt.toISOString(),

                })
                .send({

                    message: "Usuário encontrado",

                });

        } catch (error: unknown) {

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {

                return reply
                    .status(StatusCodes.CONFLICT)
                    .send({

                        error: "Usuário não encontrado",

                    });

            };

            logger.error(`Error verifying if user exists: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    message: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};
