import type { PrismaClient } from "@prisma/client/extension";
import type { FastifyInstance, FastifyPluginAsync, RawServerDefault } from "fastify";
import type { App } from "firebase-admin/app";
import type { AddDiseasesRoute } from "../types/AddDiseasesRoute.Type.js";
import { BloodTFloundResponseSchema, BloodTypeSchema, type BloodSchemaType } from "../schemas/BloodType.Schema.js";
import { Auth, getAuth } from "firebase-admin/auth";
import { UserController } from "../controller/User.Controller.js";
import { VerifyToken } from "../middleware/Auth.Middleware.js";
import { UserCreatedResponseSchema, UserSignupSchema } from "../schemas/User.Signup.Schema.js";
import { UserExistsSchema, UserFoundSchemaResponse, UserNotFoundResponseSchema } from "../schemas/UserExists.Schema.js";
import { InternalServerErrorResponseSchema } from "../schemas/InternalServerErro.Schema.js";
import { EmailFoundResponseSchema } from "../schemas/EmailFoundResponse.Schema.js";
import { PhoneFoundResponseSchema } from "../schemas/PhoneFoundResponse.Schema.js";
import { NameUpdatedResponseSchema } from "../schemas/NameUpdatedResponse.Schema.js";
import { EmailUpdatedResponseSchema } from "../schemas/EmailUpdatedResponse.Schema.js";
import { PhoneUpdatedResponseSchema } from "../schemas/PhoneUpdatedResponse.Schema.js";
import { BloodTUpdatedResponseSchema } from "../schemas/BloodTUpdatedResponse.Schema.js";
import { DiseasesFoundResponseSchema } from "../schemas/DiseasesFoundResponse.Schema.js";
import { ItemAlreadyExistsResponseSchema } from "../schemas/ItemAlreadyExistsResponse.Schema.js";
import { NoContentResponseSchema } from "../schemas/NoContentResponse.Schema.js";
import { AllergiesFoundResponseSchema } from "../schemas/AllergiesFoundResponse.Schema.js";
import { ItemNotFoundResponseSchema } from "../schemas/ItemNotFoundResponse.Schema.js";
import { ItemAddedResponseSchema } from "../schemas/ItemAddedResponse.Schema.js";
import { MedicationFoundResponseSchema } from "../schemas/MedicationFoundResponse.Schema.js";
import { EmergencyContactFoundResponseSchema } from "../schemas/EmergencyContactFoundResponse.Schema.js";
import { PhoneRegex } from "../types/PhoneRegex.js";
import { DiseaseSchema } from "../schemas/Disease.Schema.js";
import { AllergiesSchema } from "../schemas/Allergies.Schema.js";
import { MedicationSchema } from "../schemas/Medication.Schema.js";
import { EmergencyContactSchema } from "../schemas/EmergencyContact.Schema.js";
import { UserFoundResponseSchema } from "../schemas/UserFoundResponse.Schema.js";
import Type from "typebox";

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

            schema: {

                tags: ["Users"],
                summary: "Check if a user exists",
                params: UserExistsSchema,

                response: {

                    200: UserFoundSchemaResponse,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema,

                },

            },

            config: {

                rateLimit: {

                    max: 15,
                    timeWindow: "10 minute",

                },

            },

        }, this.userController.existsUser);

        fastify.get("/", {

            schema: {

                tags: ["Users"],
                summary: "Get user's informations",

                response: {

                    200: UserFoundResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "10 minute",

                },

            },

        }, this.userController.getUser);

        fastify.post("/", {

            schema: {

                tags: ["Users"],
                summary: "Create a new user",
                body: UserSignupSchema,

                response: {

                    201: UserCreatedResponseSchema,
                    409: ItemAlreadyExistsResponseSchema,
                    500: InternalServerErrorResponseSchema,

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "10 minute",

                },

            },

        }, this.userController.creatUser);

        fastify.delete("/", {

            schema: {

                tags: ["Users"],
                summary: "Delete user",

                response: {

                    204: NoContentResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUser);

        fastify.get("/bloodType", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Users"],
                summary: "Get user's blood type",

                response: {

                    200: BloodTFloundResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserBloodType);

        fastify.get("/email", {

            schema: {

                tags: ["Users"],
                summary: "Get user's email",

                response: {

                    200: EmailFoundResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            preHandler: this.verifyToken.verifyToken,

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserEmail);

        fastify.get("/phone", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Users"],
                summary: "Get user's phone number",

                response: {

                    200: PhoneFoundResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserPhone);

        fastify.patch<{

            Body: { newName: string },

        }>("/name", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Users"],
                summary: "Update user's name",

                body: Type.Object({ newName: Type.String() }),

                response: {

                    200: NameUpdatedResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.updateUserName);

        fastify.patch<{

            Body: { newEmail: string },

        }>("/email", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Users"],
                summary: "Update user's email",

                body: Type.Object({

                    newEmail: Type.String({ format: "email" }),

                }),

                response: {

                    200: EmailUpdatedResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.updateUserEmail);

        fastify.patch<{

            Body: { newPhone: string },

        }>("/phone", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Users"],
                summary: "Update user's phone",

                body: Type.Object({

                    newPhone: Type.String({ pattern: PhoneRegex }),

                }),

                response: {

                    200: PhoneUpdatedResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.updateUserPhone);

        fastify.patch<{ Body: BloodSchemaType }>("/bloodType", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Users"],
                summary: "Update user's blood type",

                body: BloodTypeSchema,

                response: {

                    200: BloodTUpdatedResponseSchema,
                    404: UserNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.updateUserBloodType);

        fastify.get("/diseases", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Diseases"],
                summary: "Get user's diseases",

                response: {

                    200: DiseasesFoundResponseSchema,
                    404: ItemNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserDisease);

        fastify.post<AddDiseasesRoute>("/diseases", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Diseases"],
                summary: "Add user's diseases",

                body: DiseaseSchema,

                response: {

                    200: ItemAddedResponseSchema,
                    409: ItemAlreadyExistsResponseSchema,
                    500: InternalServerErrorResponseSchema

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

                tags: ["Diseases"],
                summary: "Delete user's diseases",

                params: { diseaseId: Type.String() },

                response: {

                    204: NoContentResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUserDisease);

        fastify.get("/allergies", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Allergies"],
                summary: "Get user's allergies",

                response: {

                    200: AllergiesFoundResponseSchema,
                    404: ItemNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserAllergies);

        fastify.post<{

            Body: {

                allergies: {

                    description: string

                }[];

            },

        }>("/allergies", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Allergies"],
                summary: "Add user's allergies",

                body: AllergiesSchema,

                response: {

                    200: ItemAddedResponseSchema,
                    409: ItemAlreadyExistsResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 5,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.addUserAllergies);

        fastify.delete<{

            Params: { allergieId: string }

        }>("/allergies/:allergieId", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Allergies"],
                summary: "Delete user's allergies",

                params: { allergieId: Type.String() },

                response: {

                    204: NoContentResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUserAllergie);

        fastify.get("/medication", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Medication"],
                summary: "Get user's medication",

                response: {

                    200: MedicationFoundResponseSchema,
                    404: ItemNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserMedication);

        fastify.post<{

            Body: {

                medication: {

                    name: string
                    isContinuousUse: boolean

                }[];

            },

        }>("/medication", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["Medication"],
                summary: "Add user's medication",

                body: MedicationSchema,

                response: {

                    200: ItemAddedResponseSchema,
                    409: ItemAlreadyExistsResponseSchema,
                    500: InternalServerErrorResponseSchema

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

                tags: ["Medication"],
                summary: "Delete user's medication",

                params: { medicationId: Type.String() },

                response: {

                    204: NoContentResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.deleteUserMedication);

        fastify.get("/emergencyContacts", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["EmergencyContacts"],
                summary: "Get user's personal emergency contacts",

                response: {

                    200: EmergencyContactFoundResponseSchema,
                    404: ItemNotFoundResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

            },

            config: {

                rateLimit: {

                    max: 50,
                    timeWindow: "30 minute",

                },

            },

        }, this.userController.getUserEmergencyContacts);

        fastify.post<{

            Body: {

                emergencyContacts: {

                    name: string,
                    tel: string,

                }[];

            },

        }>("/emergencyContacts", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["EmergencyContacts"],
                summary: "Add user's personal emergency contacts",

                body: EmergencyContactSchema,

                response: {

                    200: ItemAddedResponseSchema,
                    409: ItemAlreadyExistsResponseSchema,
                    500: InternalServerErrorResponseSchema

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

        }>("/emergencyContacts/:contactId", {

            preHandler: this.verifyToken.verifyToken,

            schema: {

                tags: ["EmergencyContacts"],
                summary: "Delete user's personal emergency contact",

                params: { contactId: Type.String() },

                response: {

                    204: NoContentResponseSchema,
                    500: InternalServerErrorResponseSchema

                },

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

