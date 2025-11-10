import Type from "typebox";
import { NameRegex } from "../types/NameRegex.js";

export const MedicationSchema = Type.Object({

    name: Type.String({

        maxLength: 100,
        pattern: NameRegex

    }),

    isContinuousUse: Type.Boolean(),

});

