import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserInterface } from "../interfaces/User.Interface.js";
import type { BloodType, PrismaClient } from "../generated/client.js";
import type { Auth } from "firebase-admin/auth";
import { CreateUserService } from "../services/User/CreateUser.Service.js";
import { UpdateBloodType } from "../services/User/UpdateBloodType.Service.js";
import { ExistsUserService } from "../services/User/ExistsUser.Service.js";
import { AddDiseasesService } from "../services/Diseases/AddDiseases.Service.js";
import { GetDiseasesService } from "../services/Diseases/GetDiseases.Service.js";
import { DeleteDisease } from "../services/Diseases/DeleteDisease.Service.js";

export class UserController {

    private readonly prisma: PrismaClient;
    private readonly auth: Auth;

    constructor(prisma: PrismaClient, auth: Auth) {

        this.prisma = prisma;
        this.auth = auth;

    };

    public existsUser = async (

        request: FastifyRequest<{

            Params: { uid: string },

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

    public addUserDisease = async (

        request: FastifyRequest<{

            Body: {

                disease: {

                    name: string
                    isChronic: boolean

                }[];

            },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const addDisease: AddDiseasesService = new AddDiseasesService(this.prisma);
        await addDisease.exec(request, reply);

    };

    public addUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public addUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserName = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserBloodType = async (request: FastifyRequest, reply: FastifyReply) => { };

    public getUserDisease = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getDisease: GetDiseasesService = new GetDiseasesService(this.prisma);
        await getDisease.exec(request, reply);

    };

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

    public updateUserAllergies = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserMedicament = async (request: FastifyRequest, reply: FastifyReply) => { };

    public updateUserPersonalEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => { };

    public deleteUserDisease = async (

        request: FastifyRequest<{

            Params: { diseaseId: string };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const deleteDisease: DeleteDisease = new DeleteDisease(this.prisma);
        await deleteDisease.exec(request, reply);

    };

    public deleteUser = async (request: FastifyRequest, reply: FastifyReply) => { };

};
