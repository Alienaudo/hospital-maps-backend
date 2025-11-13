import { Type, type Static } from "typebox";
import { BloodTypeEnum } from "../types/BloodTypeEnum.js";

export const BloodTypeSchema = Type.Object({

    newBloodType: BloodTypeEnum,

});

export type BloodSchemaType = Static<typeof BloodTypeSchema>;

export const BloodTFloundResponseSchema = Type.Object({

    message: Type.String({ example: "Items encontrados" }),
    bloodType: BloodTypeEnum

});

