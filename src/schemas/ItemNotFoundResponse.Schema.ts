import Type from "typebox";

export const ItemNotFoundResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "404" }),
    error: Type.String({ default: "Item não foi encontrado" }),

});

