import Type from "typebox";

export const ItemAlreadyExistsResponseSchema = Type.Object({

    error: Type.String({ example: `A restrição exclusiva falhou nos campos: FIELD_NAME` }),

});

