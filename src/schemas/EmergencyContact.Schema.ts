import Type from "typebox";
import { NameRegex } from "../types/NameRegex.js";
import { PhoneRegex } from "../types/PhoneRegex.js";

export const EmergencyContactSchema = Type.Object({

    name: Type.String({

        maxLength: 50,
        pattern: NameRegex

    }),

    tel: Type.String({

        pattern: PhoneRegex,
        description: "User's personal emergnecy contacts number must follow the E.164 format.",

    }),

});

