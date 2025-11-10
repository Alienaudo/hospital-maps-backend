import Type from "typebox";

export const BloodTUpdatedResponseSchema = Type.Object({

    headers: Type.String({ default: "last-modified : 2025-11-06 15:37" }),
    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Tipo sanguineo atualizado com êxito" }),

});

