import Type from "typebox";
import { PhoneRegex } from "../types/PhoneRegex.js";

const contacts = Type.Object({

    id: Type.String(),
    name: Type.String(),
    tel: Type.String({ pattern: PhoneRegex }),

});

export const EmergencyContactFoundResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Items encontrados" }),
    count: Type.Number(),
    contacts: Type.Array(contacts),

});

