import Type from "typebox";

const diseases = Type.Object({

    id: Type.String(),
    name: Type.String(),
    isChronic: Type.Boolean(),

});

export const DiseasesFoundResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Items encontrados" }),
    count: Type.Number(),
    diseases: Type.Array(diseases),

});

