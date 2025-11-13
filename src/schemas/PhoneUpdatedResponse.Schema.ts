import Type from "typebox";

export const PhoneUpdatedResponseSchema = Type.Object({

    headers: Type.String({ default: "last-modified : 2025-11-06 15:37" }),
    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Numero de celular atualizado com êxito" }),

});

