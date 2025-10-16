import { Type, type Static } from "typebox";
import { BloodTypeEnum } from "./User.Signup.Schema.js";

export const BloodTypeSchema = Type.Object({

    id: Type.String(),
    bloodType: BloodTypeEnum,

});


export type BloodSchemaType = Static<typeof BloodTypeSchema>;

