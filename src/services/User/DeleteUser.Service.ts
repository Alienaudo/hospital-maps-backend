import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "../../generated/internal/prismaNamespace.js";
import { logger } from "../../logger.js";

export class DeleteUserService {

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

            await this.prisma.user
                .delete({

                    where: { firebaseId: uid },

                });

            return reply
                .status(StatusCodes.NO_CONTENT);

        } catch (error: unknown) {

            logger.error(`Erro while getting user's informations: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    error: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};

