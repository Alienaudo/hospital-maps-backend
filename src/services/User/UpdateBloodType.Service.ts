import type { BloodType, PrismaClient } from "../../generated/client.js";
import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";

export class UpdateBloodType {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest<{
            Body: {

                id: string,
                bloodType: BloodType

            }
        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const { id, bloodType } = request.body

            const newBloodType = await this.prisma.user
                .update({

                    where: {

                        id: id

                    },
                    data: {

                        bloodType: bloodType

                    },
                    select: {

                        bloodType: true,
                        updatedAt: true

                    },

                });

            return reply
                .status(StatusCodes.OK)
                .headers({

                    "Content-Type": "application/json",
                    "last-modified": `${newBloodType.updatedAt}`

                })
                .send({

                    message: "Tipo sanguineo atualizado com êxito",
                    booldType: newBloodType.bloodType,

                });

        } catch (error: unknown) {

            logger.error(`Erro while updating blood type: ${JSON.stringify(error)}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .headers({

                    "Content-Type": "application/json",

                })
                .send({

                    message: "Ocorreu um erro ao processar a solicitação"

                });

        };

    };

};
