import type { PrismaClient } from "@prisma/client/extension";
import type { App } from "firebase-admin/app";
import type { FastifyPluginAsync, RawServerDefault, FastifyInstance } from "fastify";
import { BloodTypeSchema, type BloodSchemaType } from "../schemas/BloodType.Schema.js";
import { UserController } from "../controller/User.Controller.js";
import { UserSignupSchema } from "../schemas/User.Signup.Schema.js";
import { VerifyToken } from "../middleware/Auth.Middleware.js";
import { Auth, getAuth } from "firebase-admin/auth";

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

        fastify.head("/exists/:firebaseUid", {

            config: {

                rateLimit: {

                    max: 15,
                    timeWindow: "10 minute",

                },

            },

        }, this.userController.existsUser),

            fastify.post("/signup", {

                schema: {

                    body: UserSignupSchema,

                },

                config: {

                    rateLimit: {

                        max: 3,
                        timeWindow: "10 minute",

                    },

                },

            }, this.userController.creatUser);

        fastify.patch<{

            Body: BloodSchemaType

        }>("/bloodType", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                body: BloodTypeSchema,

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.updateUserBloodType);

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

