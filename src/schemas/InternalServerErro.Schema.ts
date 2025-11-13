import Type from "typebox";

export const InternalServerErrorResponseSchema = Type.Object({

    error: Type.String({ example: "Ocorreu um erro ao processar a solicitação" }),

});

