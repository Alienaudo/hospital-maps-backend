import Type, { type Static } from "typebox";
import { DiseaseSchema } from "./Disease.Schema.js";
import { AllergiesSchema } from "./Allergies.Schema.js";
import { MedicationSchema } from "./Medication.Schema.js";
import { EmergencyContactSchema } from "./EmergencyContact.Schema.js";
import { BloodTypeEnum } from "../types/BloodTypeEnum.js";
import { NameRegex } from "../types/NameRegex.js";
import { PhoneRegex } from "../types/PhoneRegex.js";

export const UserSignupSchema = Type.Object({

    name: Type.String({

        maxLength: 100,
        pattern: NameRegex,
        description: "User's full name",

    }),
    email: Type.String({

        format: "email",
        description: "User's email",

    }),
    password: Type.String({

        minLength: 6,
        description: "User's password must have at least 6 characters",

    }),
    phone: Type.String({

        pattern: PhoneRegex,
        description: "User's phone number must follow the E.164 format.",

    }),
    bloodType: BloodTypeEnum,

    disease: Type.Optional(Type.Array(DiseaseSchema)),
    allergies: Type.Optional(Type.Array(AllergiesSchema)),
    medication: Type.Optional(Type.Array(MedicationSchema)),
    personalEmergencyContacts: Type.Optional(Type.Array(EmergencyContactSchema)),

}, { $id: "CreateUser" });

export type UserSignupType = Static<typeof UserSignupSchema>;

export const UserCreatedResponseSchema = Type.Object({

    message: Type.String(),

    user: Type.Object({

        id: Type.String({ format: "uuid" }),
        name: Type.String({ example: "João Pereira" }),
        email: Type.String({ format: "email" }),
        phone: Type.String({ example: "+14155552671" }),

    }),

}, { description: "When the user was created successfully" });

