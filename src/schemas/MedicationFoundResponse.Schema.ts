import Type from "typebox";

const medication = Type.Object({

    id: Type.String(),
    name: Type.String(),
    isContinuousUse: Type.Boolean(),

});

export const MedicationFoundResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Items encontrados" }),
    count: Type.Number(),
    medication: Type.Array(medication),

});

