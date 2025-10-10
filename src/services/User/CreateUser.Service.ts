import { Auth, FirebaseAuthError, getAuth, UserRecord } from "firebase-admin/auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";
import type { App } from "firebase-admin/app";
import type { UserInterface } from "../../interfaces/User.Interface.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { PrismaClient } from "../../generated/client.js";

export class CreateUserService {

    private readonly prisma: PrismaClient;
    private readonly firebase: App;

    constructor(prisma: PrismaClient, firebase: App) {

        this.prisma = prisma;
        this.firebase = firebase;

    };

    public exec = async (

        request: FastifyRequest<{ Body: UserInterface; }>,
        reply: FastifyReply

    ): Promise<FastifyReply> => {

        try {

            const {

                email,
                password,
                phone,
                name,
                bloodType,
                disease = [],
                allergies = [],
                medication = [],
                personalEmergencyContacts = []

            } = request.body;

            if (!email || !name || !phone || !password) {

                return reply
                    .status(StatusCodes.BAD_REQUEST)
                    .send({

                        message: "Todos os campos obrigatórios devem ser preenchidos."

                    });

            };

            const auth: Auth = getAuth(this.firebase);

            const firebaseUser: UserRecord = await auth
                .createUser({

                    email: email,
                    phoneNumber: phone,
                    password: password,

                });

            const newUser = await this.prisma.user
                .create({

                    data: {

                        firebaseId: firebaseUser.uid,
                        email: email,
                        phone: phone,
                        name: name,
                        bloodType: bloodType,

                        disease: {

                            create: disease

                        },

                        allergies: {

                            create: allergies

                        },

                        medication: {

                            create: medication

                        },

                        personalEmergencyContacts: {

                            create: personalEmergencyContacts

                        },

                    },

                });

            return reply
                .status(StatusCodes.CREATED)
                .send({

                    message: "Usuário criado com êxito",
                    user: {

                        id: newUser.id,
                        name: newUser.name,
                        emil: newUser.email,
                        phone: newUser.phone,

                    }

                });

        } catch (error: unknown) {

            if (error instanceof FirebaseAuthError && error.code === "auth/email-already-exists") {

                return reply
                    .status(StatusCodes.CONFLICT)
                    .send({

                        message: "O email fornecido já está em uso."

                    });

            };

            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {

                if (!error.meta) throw error

                return reply
                    .status(StatusCodes.CONFLICT)
                    .send({

                        error: `Unique constraint failed on the fields: ${error.meta.target}`

                    });

            };

            logger.error(`Erro ao criar usuário: ${JSON.stringify(error)}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    message: "Ocorreu um erro ao processar a solicitação."

                });

        };

    };

};
