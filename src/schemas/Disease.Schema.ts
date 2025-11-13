import Type from "typebox";
import { NameRegex } from "../types/NameRegex.js";

export const DiseaseSchema = Type.Object({

    name: Type.String({

        maxLength: 50,
        pattern: NameRegex

    }),
    isChronic: Type.Boolean(),

});
