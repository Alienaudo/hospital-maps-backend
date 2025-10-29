import { Type, type Static } from "typebox";
import { BloodTypeEnum } from "./User.Signup.Schema.js";

export const BloodTypeSchema = Type.Object({

    newBloodType: BloodTypeEnum,

});

export type BloodSchemaType = Static<typeof BloodTypeSchema>;

