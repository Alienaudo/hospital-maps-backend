import type { FastifyRequest } from "fastify/types/request.js";
import type { FastifyReply } from "fastify/types/reply.js";
import type { DoneFuncWithErrOrRes } from "fastify";
import { Auth, FirebaseAuthError } from "firebase-admin/auth";
import { logger } from "../logger.js";
import { StatusCodes } from "http-status-codes";

const projectId: string = process.env.GCLOUD_PROJECT || "hosptal-map";

export class VerifyToken {

    private readonly firebaseAuth: Auth;

    constructor(firebaseAuth: Auth) {

        this.firebaseAuth = firebaseAuth;

    };

    public verifyToken = async (

        request: FastifyRequest,
        reply: FastifyReply,
        done: DoneFuncWithErrOrRes

    ): Promise<FastifyReply | void> => {

        try {

            if (!request.headers.authorization) {

                logger.error("Unauthorized - No Token Provided");

                return reply
                    .status(StatusCodes.UNAUTHORIZED)
                    .send({

                        message: "Token não informado"

                    })
                    .headers({

                        "Content-Type": "application/json",

                    });

            };

            const idToken: string = request.headers.authorization;

            logger.info(idToken);

            await this.firebaseAuth
                .verifyIdToken(idToken, true)
                .then(decodedToken => {

                    if (decodedToken.aud !== projectId) {

                        return reply
                            .status(StatusCodes.UNAUTHORIZED)
                            .send({

                                message: "Token inválido para esta aplicação"

                            })
                            .headers({

                                "Content-Type": "application/json",

                            });

                    };

                    request.userFirebase = decodedToken;

                })
                .catch(reson => {

                    logger.error(`Error in Auth middleware: ${reson}`);

                    return reply
                        .status(StatusCodes.UNAUTHORIZED)
                        .send({

                            message: "Promise não foi resolvida",
                            reson: reson

                        })
                        .headers({

                            "Content-Type": "application/json",

                        });

                });

            return done();

        } catch (error: unknown) {

            if (error instanceof FirebaseAuthError) {

                switch (error.code) {

                    case "auth/argument-error":

                        return reply
                            .status(StatusCodes.UNAUTHORIZED)
                            .send({

                                message: "Erro ao decodificar o token",

                            })
                            .headers({

                                "Content-Type": "application/json",

                            });

                    case "auth/id-token-expired":

                        return reply
                            .status(StatusCodes.UNAUTHORIZED)
                            .send({

                                message: "O token informado expirou",

                            })
                            .headers({

                                "Content-Type": "application/json",

                            });

                    case "auth/id-token-revoked":

                        return reply
                            .status(StatusCodes.UNAUTHORIZED)
                            .send({

                                message: "O token informado perdeu a validade",

                            })
                            .headers({

                                "Content-Type": "application/json",

                            });

                };

            };

            logger.error(`Error in Auth middleware: ${error}`);

            return reply
                .status(StatusCodes.UNAUTHORIZED)
                .send({

                    message: "Erro no middleware de autenticação",

                })
                .headers({

                    "Content-Type": "application/json",

                });

        };

    };

};

