import Type from "typebox";
import { BloodTypeEnum } from "../types/BloodTypeEnum.js";
import { NameRegex } from "../types/NameRegex.js";
import { PhoneRegex } from "../types/PhoneRegex.js";

const user = Type.Object({

    id: Type.String({

        format: "uuid",
        examples: ["016ab4f4-2145-4044-87b4-4764a1dd3614"],

    }),

    firebaseId: Type.String({

        examples: ["c4jX7pWqA9bM2rL3zS8yHkFv"],

    }),

    name: Type.String({

        maxLength: 100,
        pattern: NameRegex,
        description: "User's full name",

    }),

    email: Type.String({

        format: "email",
        description: "User's email",

    }),

    phone: Type.String({

        pattern: PhoneRegex,
        description: "User's phone number must follow the E.164 format.",

    }),

    bloodType: BloodTypeEnum,

    createdAt: Type.String({ format: "date-time" }),

    updatedAt: Type.String({ format: "date-time" }),

});

export const UserFoundResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Items encontrados" }),
    user: Type.Array(user),

});

