import { FastifyInstance } from 'fastify';
import { App } from 'firebase-admin/app';

declare module 'fastify' {

    interface FastifyInstance {

        firebase: App;

    }

}
