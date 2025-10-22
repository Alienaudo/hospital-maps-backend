import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import type { BatchPayload } from "../../generated/internal/prismaNamespace.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";

export class DeleteMedicationService {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest<{

            Params: { medicationId: string };

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const uid: string | undefined = request.userFirebase?.uid;
            const { medicationId } = request.params;

            if (!uid) throw Error("Auth Middleware not privided user's uid");

            const result: BatchPayload = await this.prisma.medication
                .deleteMany({

                    where: {

                        id: medicationId,

                        user: {

                            some: {

                                firebaseId: uid

                            },

                        },

                    },

                });

            if (result.count === 0) {

                return reply
                    .status(StatusCodes.NOT_FOUND)
                    .send({

                        error: "Item não foi encontrado",

                    });

            };

            return reply
                .status(StatusCodes.NO_CONTENT);

        } catch (error: unknown) {

            logger.error(`Error deleting medicationId: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    message: "Ocorreu um erro ao processar a solicitação"

                });

        };

    };

};

