import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserInterface } from "../interfaces/User.Interface.js";
import type { BloodType, PrismaClient } from "../generated/client.js";
import type { Auth } from "firebase-admin/auth";
import { CreateUserService } from "../services/User/CreateUser.Service.js";
import { UpdateBloodType } from "../services/User/UpdateBloodType.Service.js";
import { ExistsUserService } from "../services/User/ExistsUser.Service.js";

export class UserController {

    private readonly prisma: PrismaClient;
    private readonly auth: Auth;

    constructor(prisma: PrismaClient, auth: Auth) {

        this.prisma = prisma;
        this.auth = auth;

    };

    public existsUser = async (

        request: FastifyRequest<{

            Params: {

                firebaseUid: string,

            },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const existsUser: ExistsUserService = new ExistsUserService(this.prisma, this.auth);
        await existsUser.exec(request, reply);

    };

    public creatUser = async (

        request: FastifyRequest<{ Body: UserInterface }>,
        reply: FastifyReply

    ): Promise<void> => {

        const createUserService: CreateUserService = new CreateUserService(this.prisma, this.auth);
        await createUserService.exec(request, reply);

    };

    public addUserDisease = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserName = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserBloodType = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserDisease = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUser = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserName = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserBloodType = async (

        request: FastifyRequest<{

            Body: {

                id: string,
                bloodType: BloodType,

            };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const updateBloodType: UpdateBloodType = new UpdateBloodType(this.prisma);
        await updateBloodType.exec(request, reply);

    };

    public updateUserDisease = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public deleteUser = async (request: FastifyRequest, reply: FastifyReply) => { };

};
