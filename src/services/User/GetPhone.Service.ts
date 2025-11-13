import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "../../generated/internal/prismaNamespace.js";
import { logger } from "../../logger.js";

export class GetPhoneService {

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

            const result: { phone: string } = await this.prisma.user
                .findUniqueOrThrow({

                    where: { firebaseId: uid },
                    select: { phone: true },

                });

            return reply
                .status(StatusCodes.OK)
                .send({

                    message: "Items encontrados",
                    phone: result.phone,

                });

        } catch (error: unknown) {

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {

                return reply
                    .status(StatusCodes.NOT_FOUND)
                    .send({

                        error: "Usuário não encontrado",

                    });

            };

            logger.error(`Erro while getting user's phone: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    error: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};

