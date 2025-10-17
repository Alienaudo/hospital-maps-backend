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

            Params: {

                firebaseUid: string,

            },

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const { firebaseUid } = request.params;

            if (!firebaseUid) {

                return reply
                    .status(StatusCodes.BAD_REQUEST)
                    .headers({

                        "Content-Type": "application/json;",

                    })
                    .send({

                        error: "Attribute 'firebaseUid' must be informed",

                    });

            };

            const firebaseUser: UserRecord = await this.auth
                .getUser(firebaseUid)
                .catch(problem => {

                    logger.error(`Firebase lookup error: ${problem}`);

                    return reply
                        .status(StatusCodes.NOT_FOUND)
                        .headers({

                            "Content-Type": "application/json",

                        })
                        .send({

                            message: "Usuário não encontrado no Firebase",

                        });

                });

            const existInDB = await this.prisma.user
                .findUniqueOrThrow({

                    where: {

                        firebaseId: firebaseUser.uid,

                    },
                    select: { updatedAt: true },

                });

            return reply
                .status(StatusCodes.OK)
                .headers({

                    "Content-Type": "application/json",

                })
                .send({

                    message: "Usuário encontrado",
                    updatedAt: existInDB.updatedAt,

                });

        } catch (error: unknown) {

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {

                return reply
                    .status(StatusCodes.CONFLICT)
                    .headers({

                        "Content-Type": "application/json",

                    })
                    .send({

                        error: "Usuário não encontrado",

                    });

            };

            logger.error(`Error verifying if user exists: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .headers({

                    "Content-Type": "application/json",

                })
                .send({

                    message: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};
