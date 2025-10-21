import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";
import { PrismaClientKnownRequestError } from "../../generated/internal/prismaNamespace.js";

export class AddDiseasesService {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest<{

            Body: {

                disease: {

                    name: string
                    isChronic: boolean

                }[];

            },

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const uid: string | undefined = request.userFirebase?.uid;
            const { disease } = request.body;

            if (!uid) throw Error("Auth Middleware not privided user's uid");

            const result = await this.prisma.user
                .update({

                    where: { firebaseId: uid },

                    data: {

                        disease: { create: disease },

                    },

                    select: { updatedAt: true },

                });

            return reply
                .status(StatusCodes.OK)
                .headers({

                    "Content-Type": "application/json;",
                    "last-modified": `${result.updatedAt.toISOString()}`,

                })
                .send({

                    message: "Item adicionado com êxito",

                });

        } catch (error: unknown) {

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {

                return reply
                    .status(StatusCodes.NOT_FOUND)
                    .send({

                        error: "Usuário não encontrado",

                    });

            };

            logger.error(`Erro while updating blood type: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    error: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};

