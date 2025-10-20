import type { UserInterface } from "../../interfaces/User.Interface.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { PrismaClient, User } from "../../generated/client.js";
import { Auth, UserRecord } from "firebase-admin/auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../logger.js";

export class CreateUserService {

    private readonly prisma: PrismaClient;
    private readonly auth: Auth;

    constructor(prisma: PrismaClient, auth: Auth) {

        this.prisma = prisma;
        this.auth = auth;

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

            const firebaseUser: UserRecord = await this.auth
                .createUser({

                    email: email,
                    phoneNumber: phone,
                    password: password,

                })
                .catch(problem => {

                    logger.error(`Error creating user: \n ${problem}`);

                    return reply
                        .status(StatusCodes.CONFLICT)
                        .send({

                            message: "Erro ao criar o usuário",
                            problem: problem

                        });

                });

            const cookie: string = await this.auth
                .createCustomToken(firebaseUser.uid);

            const newUser: User = await this.prisma.user
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

            reply
                .setCookie("jwt", cookie, {

                    path: "/",
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    secure: false,
                    httpOnly: true,
                    sameSite: "strict",

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

                    },

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

            logger.error(`Error creating user: ${error}`);

            return reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({

                    message: "Ocorreu um erro ao processar a solicitação"

                });

        };

    };

};
