import Type from "typebox";

export const EmailUpdatedResponseSchema = Type.Object({

    message: Type.String({ example: "Email atualizado com êxito" }),

});

