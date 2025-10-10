import { CreateUserService } from "../services/User/CreateUser.Service.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserInterface } from "../interfaces/User.Interface.js";
import type { App } from "firebase-admin/app";
import type { PrismaClient } from "../generated/client.js";

export class UserController {

    private readonly prisma: PrismaClient;
    private readonly firebase: App;

    constructor(prisma: PrismaClient, firebase: App) {

        this.prisma = prisma;
        this.firebase = firebase;

    };

    public creatUser = async (

        request: FastifyRequest<{ Body: UserInterface }>,
        reply: FastifyReply

    ): Promise<void> => {

        const createUserService: CreateUserService = new CreateUserService(this.prisma, this.firebase);
        await createUserService.exec(request, reply);

    };

    public addUserBloodType = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserDisease = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUser = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserName = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserBloodType = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserDisease = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUser = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserName = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserBloodType = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserDisease = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public deleteUser = async (request: FastifyRequest, reply: FastifyReply) => { };

};
