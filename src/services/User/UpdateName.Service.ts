import type { PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";

export class UpdateNameService {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest<{

            Body: { newName: string },

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const uid: string | undefined = request.userFirebase?.uid;
            const { newName } = request.body

            if (!uid) throw Error("Auth Middleware not privided user's uid");

            const result = await this.prisma.user
                .update({

                    where: { firebaseId: uid },
                    data: { name: newName },
                    select: { updatedAt: true },

                });

            return reply
                .status(StatusCodes.OK)
                .headers({

                    "last-modified": `${result.updatedAt}`,

                })
                .send({

                    message: "Nome do usuário atualizado com êxito",

                });

        } catch (error: unknown) {

            logger.error(`Erro while updating name: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    message: "Ocorreu um erro ao processar a solicitação"

                });

        };

    };

};

