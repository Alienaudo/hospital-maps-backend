import { Type, type Static } from "@sinclair/typebox";

const BloodTypeEnum = Type.Union([

    Type.Literal("A_NEGATIVE"),
    Type.Literal("A_POSITIVE"),
    Type.Literal("B_NEGATIVE"),
    Type.Literal("B_POSITIVE"),
    Type.Literal("AB_NEGATIVE"),
    Type.Literal("AB_POSITIVE"),
    Type.Literal("O_NEGATIVE"),
    Type.Literal("O_POSITIVE"),

]);

const DiseaseSchema = Type.Object({

    name: Type.String({ maxLength: 50, pattern: "^[a-zA-Z0-9]*$" }),
    isChronic: Type.Boolean(),

});

const AllergiesSchema = Type.Object({

    description: Type.String({ maxLength: 300, pattern: "^[a-zA-Z0-9 ]*$" }),

});

const MedicationSchema = Type.Object({

    name: Type.String({ maxLength: 100, pattern: "^[a-zA-Z0-9 ]*$" }),
    isContinuousUse: Type.Boolean(),

});

const PhoneRegex = "^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$";

const EmergencyContactSchema = Type.Object({

    name: Type.String({ maxLength: 50, pattern: "^[a-zA-Z0-9 ]*$" }),
    tel: Type.String({ pattern: PhoneRegex }),

});

export const UserSignupSchema = Type.Object({

    name: Type.String({ maxLength: 100, pattern: "^[a-zA-Z0-9]*$" }),
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 6 }),
    phone: Type.String({ pattern: PhoneRegex }),
    bloodType: BloodTypeEnum,

    disease: Type.Optional(Type.Array(DiseaseSchema)),
    allergies: Type.Optional(Type.Array(AllergiesSchema)),
    medication: Type.Optional(Type.Array(MedicationSchema)),
    personalEmergencyContacts: Type.Optional(Type.Array(EmergencyContactSchema)),

});

export type UserSignupType = Static<typeof UserSignupSchema>;
