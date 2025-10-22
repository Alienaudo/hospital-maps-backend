import type { PrismaClient } from "@prisma/client/extension";
import type { FastifyInstance, FastifyPluginAsync, RawServerDefault } from "fastify";
import type { App } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import Type from "typebox";
import { UserController } from "../controller/User.Controller.js";
import { VerifyToken } from "../middleware/Auth.Middleware.js";
import { BloodTypeSchema, type BloodSchemaType } from "../schemas/BloodType.Schema.js";
import { PhoneRegex, UserSignupSchema } from "../schemas/User.Signup.Schema.js";
import type { AddDiseasesRoute } from "../types/AddDiseasesRoute.Type.js";

class UserRoutes {

    private readonly userController: UserController;
    private readonly verifyToken: VerifyToken;

    constructor(

        prisma: PrismaClient,
        auth: Auth,
        verifyToken: VerifyToken

    ) {

        this.userController = new UserController(prisma, auth);
        this.verifyToken = verifyToken;

    };

    public userRoutes = async (fastify: FastifyInstance): Promise<void> => {

        fastify.head("/exists/:uid", {

            config: {

                rateLimit: {

                    max: 15,
                    timeWindow: "10 minute",

                },

            },

        }, this.userController.existsUser),

            fastify.post("/signup", {

                schema: { body: UserSignupSchema },

                config: {

                    rateLimit: {

                        max: 3,
                        timeWindow: "10 minute",

                    },

                },

            }, this.userController.creatUser);

        fastify.patch<{ Body: BloodSchemaType }>("/bloodType", {

            preHandler: this.verifyToken.verifyToken,

            schema: { body: BloodTypeSchema },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.updateUserBloodType);

        fastify.get("/diseases", {

            preHandler: this.verifyToken.verifyToken,

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserDisease);

        fastify.patch<AddDiseasesRoute>("/diseases", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                body: {

                    name: Type.String({

                        maxLength: 50,
                        pattern: /^[a-zA-ZÀ-ÿ0-9 ]*$/,

                    }),
                    isChronic: Type.Boolean(),

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.addUserDisease);

        fastify.delete<{

            Params: { diseaseId: string }

        }>("/diseases/:diseaseId", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                params: { diseaseId: Type.String() },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUserDisease);

        fastify.get("/medication", {

            preHandler: this.verifyToken.verifyToken,

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserMedication);

        fastify.patch<{

            Body: {

                medication: {

                    name: string
                    isContinuousUse: boolean

                }[];

            },

        }>("/medication", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                body: {

                    name: Type.String({

                        maxLength: 50,
                        pattern: /^[a-zA-ZÀ-ÿ0-9 ]*$/,

                    }),
                    isContinuousUse: Type.Boolean(),

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.addUserMedication);

        fastify.delete<{

            Params: { medicationId: string }

        }>("/medication/:medicationId", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                params: { medicationId: Type.String() },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUserMedication);

        fastify.get("/emergencyContact", {

            preHandler: this.verifyToken.verifyToken,

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserEmergencyContacts);

        fastify.patch<{

            Body: {

                emergencyContacts: {

                    name: string,
                    tel: string,

                }[];

            },

        }>("/emergencyContact", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                body: {

                    name: Type.String({

                        maxLength: 50,
                        pattern: /^[a-zA-ZÀ-ÿ0-9 ]*$/,

                    }),
                    tel: Type.String({ pattern: PhoneRegex }),

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.addUserEmergencyContacts);

        fastify.delete<{

            Params: { contactId: string };

        }>("/emergencyContact/:contactId", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                params: { contactId: Type.String() },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUserEmergencyContact);

    };

};

export const UserRoutePlugin: FastifyPluginAsync = async (fastify: FastifyInstance<RawServerDefault>): Promise<void> => {

    const prismaInstance: PrismaClient = fastify.prisma;
    const firebaseInstance: App = fastify.firebase;
    const firebaseAuthInstance: Auth = getAuth(firebaseInstance);
    const verifyTokenInstance: VerifyToken = new VerifyToken(firebaseAuthInstance);

    const userRoutesInstance: UserRoutes = new UserRoutes(

        prismaInstance,
        firebaseAuthInstance,
        verifyTokenInstance

    );

    await userRoutesInstance.userRoutes(fastify);

};

