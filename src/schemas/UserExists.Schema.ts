import Type from "typebox";

export const UserExistsSchema = Type.Object({

    uid: Type.String({

        description: "User's firebase id"

    }),


}, { $id: "UserExists" });

export const UserFoundSchemaResponse = Type.Object({

    headers: Type.String({ format: "date-time" }),
    message: Type.String({ example: "Usuáro encontrado" }),

});


export const UserNotFoundResponseSchema = Type.Object({

    message: Type.String({ example: "Usuáro não encontrado" }),

});

