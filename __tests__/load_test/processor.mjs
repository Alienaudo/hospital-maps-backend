import { logger } from "../../src/logger.ts";

export function parsePayload(context, events, next) {

    const { vars } = context;

    const fieldsToParse = [

        'disease',
        'allergies',
        'medication',
        'personalEmergencyContacts'

    ];

    if (!vars) {

        logger.error("'context.vars' is not defined");
        return next();

    };

    if (typeof vars.phone !== 'string' && (typeof vars.phone === 'number' || vars.phone)) {

        vars.phone = String("+" + vars.phone);

    };

    fieldsToParse.forEach(field => {

        const stringValue = vars[field];

        if (stringValue && typeof stringValue === "string" && stringValue.trim().length > 0) {

            try {

                vars[field] = JSON.parse(stringValue);

            } catch (e) {

                logger.error(`Failed to parse JSON for the field ${field}. Value: "${stringValue}". Erro:`, e.message);
                vars[field] = [];

            };

        };

        vars[field] = [];

    });

    return next();

};
