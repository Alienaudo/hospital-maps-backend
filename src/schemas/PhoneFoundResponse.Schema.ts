import Type from "typebox";
import { PhoneRegex } from "../types/PhoneRegex.js";

export const PhoneFoundResponseSchema = Type.Object({

    message: Type.String({ default: "Items encontrados" }),
    phone: Type.String({ pattern: PhoneRegex }),

});

