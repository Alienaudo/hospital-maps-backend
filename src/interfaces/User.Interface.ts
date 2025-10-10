import type { BloodType } from "../generated/enums.js"

export interface UserInterface {

    email: string
    password: string
    phone: string
    name: string
    bloodType: BloodType

    disease?: {

        name: string
        isChronic: boolean

    }[];

    allergies?: {

        description: string

    }[];

    medication?: {

        name: string
        isContinuousUse: boolean

    }[];

    personalEmergencyContacts?: {

        name: string
        tel: string

    }[];

};
