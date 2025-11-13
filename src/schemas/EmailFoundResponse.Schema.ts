import Type from "typebox";

export const EmailFoundResponseSchema = Type.Object({

    message: Type.String({ example: "Items encontrados" }),
    email: Type.String({ format: "email" }),

});

