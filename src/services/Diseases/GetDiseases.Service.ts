import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "../../generated/internal/prismaNamespace.js";
import { logger } from "../../logger.js";

export class GetDiseasesService {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const uid: string | undefined = request.userFirebase?.uid;

            if (!uid) throw Error("Auth Middleware not privided user's uid");

            const result = await this.prisma.disease
                .findMany({

                    where: {

                        user: {

                            some: { firebaseId: uid },

                        },

                    },

                    select: {

                        id: true,
                        name: true,
                        isChronic: true

                    },

                    orderBy: { createdAt: "desc" },

                });

            if (!result) {

                return reply
                    .status(StatusCodes.NOT_FOUND)
                    .send({

                        error: "Item não foi encontrado",

                    });

            };

            return reply
                .status(StatusCodes.OK)
                .send({

                    message: "Items encontrados",
                    count: result.length,
                    disease: result,

                });

        } catch (error: unknown) {

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {

                return reply
                    .status(StatusCodes.NOT_FOUND)
                    .send({

                        error: "Usuário não encontrado",

                    });

            };

            logger.error(`Erro while getting user's diseases: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    error: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};

