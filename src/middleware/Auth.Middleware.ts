import { Auth, type DecodedIdToken, FirebaseAuthError } from "firebase-admin/auth";
import { logger } from "../logger.js";
import type { FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

export class VerifyToken {

    private readonly firebaseAuth: Auth;

    constructor(firebaseAuth: Auth) {

        this.firebaseAuth = firebaseAuth;

    };

    public verifyToken = async (idToken: string, reply: FastifyReply): Promise<string> => {

        try {

            const decodedToken: DecodedIdToken = await this.firebaseAuth
                .verifyIdToken(idToken);

            return decodedToken.uid;

        } catch (error: unknown) {

            if (error instanceof FirebaseAuthError) {

                switch (error.code) {

                    case "auth/id-token-expired":

                        return reply
                            .status(StatusCodes.UNAUTHORIZED)
                            .send({

                                message: "O token informado expirou."

                            });

                    case "auth/id-token-revoked":

                        return reply
                            .status(StatusCodes.UNAUTHORIZED)
                            .send({

                                message: "O token informado perdeu a validade."

                            });

                };

            };

            logger.error(`Error in Auth middleware: ${error}`);
            throw new Error("Error in Auth middleware")

        };

    };

};

