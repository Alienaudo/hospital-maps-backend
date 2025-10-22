import type { FastifyRequest } from "fastify/types/request.js";
import type { PrismaClient } from "../../generated/client.js";
import type { FastifyReply } from "fastify/types/reply.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "../../generated/internal/prismaNamespace.js";
import { logger } from "../../logger.js";

export class AddEmergencyContactsService {

    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {

        this.prisma = prisma;

    };

    public exec = async (

        request: FastifyRequest<{

            Body: {

                emergencyContacts: {

                    name: string,
                    tel: string,

                }[];

            },

        }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const uid: string | undefined = request.userFirebase?.uid;
            const { emergencyContacts } = request.body;

            if (!uid) throw Error("Auth Middleware not privided user's uid");

            const result = await this.prisma.user
                .update({

                    where: { firebaseId: uid },
                    data: {

                        personalEmergencyContacts: { create: emergencyContacts },

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

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {

                if (!error.meta) throw error

                return reply
                    .status(StatusCodes.CONFLICT)
                    .send({

                        error: `A restrição exclusiva falhou nos campos: ${error.meta.target}`

                    });

            };

            logger.error(`Error while adding emergency contact: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    error: "Ocorreu um erro ao processar a solicitação",

                });

        };

    };

};

