import Type from "typebox";

export const ItemAddedResponseSchema = Type.Object({

    "last-modified": Type.String({ default: "2025-11-06 15:37" }),
    statusCode: Type.Number({ default: "200" }),
    message: Type.String({ default: "Item adicionado com êxito" }),

});

