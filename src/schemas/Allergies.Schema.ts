import Type from "typebox";
import { NameRegex } from "../types/NameRegex.js";

export const AllergiesSchema = Type.Object({

    description: Type.String({

        maxLength: 300,
        pattern: NameRegex

    }),

});

