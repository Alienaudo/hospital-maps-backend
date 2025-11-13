import Type from "typebox";

export const NameUpdatedResponseSchema = Type.Object({

    message: Type.String({ example: "Nome do usuário atualizado com êxito" }),

});

