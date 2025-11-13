import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { PrismaClient } from "../generated/client.js";
import { logger } from "../logger.js";

export let prisma: PrismaClient;

const MAX_RETRIES: number = 3;
const RETRY_DELAY: number = 1000;

const initializePrisma = async (retries: number = 0): Promise<PrismaClient> => {

    try {

        const client: PrismaClient = new PrismaClient();
        await client.$connect();

        logger.info("Database connected!");

        return client;

    } catch (error: unknown) {

        if (error instanceof PrismaClientInitializationError) {

            switch (error.errorCode) {

                case "P1001":

                    if (retries < MAX_RETRIES) {

                        const delay: number = RETRY_DELAY * Math.pow(2, retries);

                        logger.warn(`Attempt ${++retries} has failed (P1001). Try again in ${delay}ms...`);
                        await new Promise(resolve => setTimeout(resolve, delay));

                        return initializePrisma(++retries);

                    };

                    throw new Error("Database connection failure (P1001). Check host/port and server status.");

                case "P1013":

                    throw new Error("Invalid connection URL (P1013). Check the string in .env/schema.prisma.");

                case "P6008":

                    if (retries < MAX_RETRIES) {

                        const delay: number = RETRY_DELAY * Math.pow(2, retries);

                        logger.warn(`Attempt ${++retries} has failed (P1001). Try again in ${delay}ms...`);
                        await new Promise(resolve => setTimeout(resolve, delay));

                        return initializePrisma(++retries);

                    };

                    throw new Error("Persistent Prisma engine failure (P6008). Check Accelerate or engine binary settings.");

            };

        };

        throw new Error(`Error instantiating PrismaClient: ${error}`);

    };

};

prisma = await initializePrisma();
