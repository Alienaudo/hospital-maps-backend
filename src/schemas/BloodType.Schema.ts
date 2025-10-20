import { Type, type Static } from "typebox";
import { BloodTypeEnum } from "./User.Signup.Schema.js";

export const BloodTypeSchema = Type.Object({

    id: Type.String({ format: "uuid" }),
    bloodType: BloodTypeEnum,

});


export type BloodSchemaType = Static<typeof BloodTypeSchema>;

