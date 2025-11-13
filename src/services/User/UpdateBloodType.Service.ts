import type { BloodType, PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";

export class UpdateBloodTypeService {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest<{

            Body: { newBloodType: BloodType },

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const uid: string | undefined = request.userFirebase?.uid;
            const { newBloodType } = request.body

            if (!uid) throw Error("Auth Middleware not privided user's uid");

            const result = await this.prisma.user
                .update({

                    where: { firebaseId: uid },
                    data: { bloodType: newBloodType },
                    select: { updatedAt: true },

                });

            return reply
                .status(StatusCodes.OK)
                .headers({

                    "last-modified": `${result.updatedAt}`,

                })
                .send({

                    message: "Tipo sanguineo atualizado com êxito",

                });

        } catch (error: unknown) {

            logger.error(`Erro while updating blood type: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    message: "Ocorreu um erro ao processar a solicitação"

                });

        };

    };

};

