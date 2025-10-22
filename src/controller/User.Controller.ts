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
import { AddMedication } from "../services/Medication/AddMedication.Service.js";
import { GetMedicationService } from "../services/Medication/GetMedication.Service.js";
import { DeleteMedicationService } from "../services/Medication/DeleteMedication.Service.js";
import { AddEmergencyContactsService } from "../services/EmergencyContacts/AddEmergencyContacts.Service.js";
import { GetEmergencyContacts } from "../services/EmergencyContacts/GetEmergencyContacts.Service.js";
import { DeleteEmergencyContactService } from "../services/EmergencyContacts/DeleteEmergencyContacts.Service.js";

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

    public addUserMedication = async (

        request: FastifyRequest<{

            Body: {

                medication: {

                    name: string
                    isContinuousUse: boolean

                }[];

            },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const addMedicament: AddMedication = new AddMedication(this.prisma);
        await addMedicament.exec(request, reply);

    };

    public addUserEmergencyContacts = async (

        request: FastifyRequest<{

            Body: {

                emergencyContacts: {

                    name: string,
                    tel: string,

                }[];

            },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const addEmergencyContacts: AddEmergencyContactsService = new AddEmergencyContactsService(this.prisma);
        await addEmergencyContacts.exec(request, reply);

    };

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

    public getUserMedication = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {

        const getMedication: GetMedicationService = new GetMedicationService(this.prisma);
        await getMedication.exec(request, reply);

    };

    public getUserEmergencyContacts = async (request: FastifyRequest, reply: FastifyReply) => {

        const getEmergencyContacts: GetEmergencyContacts = new GetEmergencyContacts(this.prisma);
        await getEmergencyContacts.exec(request, reply);

    };

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

    }

    public deleteUserMedication = async (

        request: FastifyRequest<{

            Params: { medicationId: string };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const deleteDisease: DeleteMedicationService = new DeleteMedicationService(this.prisma);
        await deleteDisease.exec(request, reply);

    };

    public deleteUserEmergencyContact = async (

        request: FastifyRequest<{

            Params: { contactId: string };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const deleteEmergencyContact: DeleteEmergencyContactService = new DeleteEmergencyContactService(this.prisma);
        await deleteEmergencyContact.exec(request, reply);

    };

    public deleteUser = async (request: FastifyRequest, reply: FastifyReply) => { };

};
