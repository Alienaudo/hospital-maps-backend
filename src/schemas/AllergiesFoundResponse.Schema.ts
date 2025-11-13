import Type from "typebox";

const allergies = Type.Object({

    id: Type.String(),
    description: Type.String(),

});

export const AllergiesFoundResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Items encontrados" }),
    count: Type.Number(),
    allergies: Type.Array(allergies),

});

