import Type from "typebox";

export const NoContentResponseSchema = Type.Object({

    statusCode: Type.Number({ default: "204" }),

});

