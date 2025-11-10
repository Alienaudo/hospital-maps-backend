import Type from "typebox";

export const BloodTypeEnum = Type.Union([

    Type.Literal("A_NEGATIVE"),
    Type.Literal("A_POSITIVE"),
    Type.Literal("B_NEGATIVE"),
    Type.Literal("B_POSITIVE"),
    Type.Literal("AB_NEGATIVE"),
    Type.Literal("AB_POSITIVE"),
    Type.Literal("O_NEGATIVE"),
    Type.Literal("O_POSITIVE"),

]);


