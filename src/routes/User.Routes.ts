import type { PrismaClient } from "@prisma/client/extension";
import type { App } from "firebase-admin/app";
import type { FastifyPluginAsync, RawServerDefault, FastifyInstance } from "fastify";
import { UserController } from "../controller/User.Controller.js";
import { UserSignupSchema } from "../schemas/User.Signup.Schema.js";

class UserRoutes {

    private readonly userController;

    constructor(prisma: PrismaClient, firebase: App) {

        this.userController = new UserController(prisma, firebase);

    };

    public userRoutes = async (fastify: FastifyInstance): Promise<void> => {

        fastify.post("/signup", {

            schema: {

                body: UserSignupSchema

            },

            config: {

                rateLimit: {

                    max: 3,
                    timeWindow: "10 minute",

                },

            },

        }, this.userController.creatUser);

    };

};

export const UserRoutePlugin: FastifyPluginAsync = async (fastify: FastifyInstance<RawServerDefault>): Promise<void> => {

    const prismaInstance: PrismaClient = fastify.prisma;
    const firebaseInstance: App = fastify.firebase;

    const userRoutesInstance: UserRoutes = new UserRoutes(prismaInstance, firebaseInstance);

    await userRoutesInstance.userRoutes(fastify);

};
