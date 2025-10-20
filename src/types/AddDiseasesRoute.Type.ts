
export interface AddDiseasesRoute {

    Body: {

        disease: {

            name: string
            isChronic: boolean

        }[];

    },

};
