import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserInterface } from "../interfaces/User.Interface.js";
import type { BloodType, PrismaClient } from "../generated/client.js";
import type { Auth } from "firebase-admin/auth";
import { CreateUserService } from "../services/User/CreateUser.Service.js";
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
import { GetAllergiesService } from "../services/Allergies/GetAllergies.Service.js";
import { AddAllergiesService } from "../services/Allergies/AddAllergies.Service.js";
import { DeleteAllergieService } from "../services/Allergies/DeleteAllergies.Service.js";
import { GetBloodTypeService } from "../services/User/GetBloodType.Service.js";
import { GetEmailService } from "../services/User/GetEmail.Service.js";
import { GetPhoneService } from "../services/User/GetPhone.Service.js";
import { UpdateEmailService } from "../services/User/UpdateEmail.Service.js";
import { UpdateBloodTypeService } from "../services/User/UpdateBloodType.Service.js";
import { UpdateNameService } from "../services/User/UpdateName.Service.js";
import { UpdatePhoneService } from "../services/User/UpdatePhone.Service.js";
import { logger } from "../logger.js";
import { GetUserService } from "../services/User/GetUser.Service.js";

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

        logger.info(request.body)
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

    public addUserAllergies = async (

        request: FastifyRequest<{

            Body: {

                allergies: {

                    description: string

                }[];

            },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const addAllergies: AddAllergiesService = new AddAllergiesService(this.prisma);
        await addAllergies.exec(request, reply);

    };

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

    public getUser = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getUserService: GetUserService = new GetUserService(this.prisma);
        await getUserService.exec(request, reply);

    };

    public getUserBloodType = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getBloodType: GetBloodTypeService = new GetBloodTypeService(this.prisma);
        await getBloodType.exec(request, reply);

    };

    public getUserEmail = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getEmail: GetEmailService = new GetEmailService(this.prisma);
        await getEmail.exec(request, reply);

    };

    public getUserPhone = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getPhone: GetPhoneService = new GetPhoneService(this.prisma);
        await getPhone.exec(request, reply);

    };

    public getUserDisease = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getDisease: GetDiseasesService = new GetDiseasesService(this.prisma);
        await getDisease.exec(request, reply);

    };

    public getUserAllergies = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getAllergies: GetAllergiesService = new GetAllergiesService(this.prisma);
        await getAllergies.exec(request, reply);

    };

    public getUserMedication = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getMedication: GetMedicationService = new GetMedicationService(this.prisma);
        await getMedication.exec(request, reply);

    };

    public getUserEmergencyContacts = async (

        request: FastifyRequest,
        reply: FastifyReply

    ): Promise<void> => {

        const getEmergencyContacts: GetEmergencyContacts = new GetEmergencyContacts(this.prisma);
        await getEmergencyContacts.exec(request, reply);

    };

    public updateUserName = async (

        request: FastifyRequest<{

            Body: { newName: string },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const updateName: UpdateNameService = new UpdateNameService(this.prisma);
        await updateName.exec(request, reply);

    };

    public updateUserEmail = async (

        request: FastifyRequest<{

            Body: { newEmail: string },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const updateEmail: UpdateEmailService = new UpdateEmailService(this.prisma);
        await updateEmail.exec(request, reply);

    };

    public updateUserPhone = async (

        request: FastifyRequest<{

            Body: { newPhone: string },

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const updatePhone: UpdatePhoneService = new UpdatePhoneService(this.prisma);
        await updatePhone.exec(request, reply);

    };

    public updateUserBloodType = async (

        request: FastifyRequest<{

            Body: { newBloodType: BloodType };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const updateBloodType: UpdateBloodTypeService = new UpdateBloodTypeService(this.prisma);
        await updateBloodType.exec(request, reply);

    };

    public deleteUserDisease = async (

        request: FastifyRequest<{

            Params: { diseaseId: string };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const deleteDisease: DeleteDisease = new DeleteDisease(this.prisma);
        await deleteDisease.exec(request, reply);

    };

    public deleteUserAllergie = async (

        request: FastifyRequest<{

            Params: { allergieId: string };

        }>,
        reply: FastifyReply

    ): Promise<void> => {

        const deleteAllergie: DeleteAllergieService = new DeleteAllergieService(this.prisma);
        await deleteAllergie.exec(request, reply);

    };

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
