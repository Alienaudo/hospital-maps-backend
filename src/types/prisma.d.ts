import { FastifyInstance } from 'fastify';

declare module 'fastify' {

    interface FastifyInstance {

        prisma: PrismaClient;
        firebase: App;

    }

};
