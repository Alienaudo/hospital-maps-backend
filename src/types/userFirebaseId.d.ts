import type { FastifyRequest } from "fastify/types/request.js";
import type { DecodedIdToken } from "firebase-admin/auth";

declare module 'fastify' {

    interface FastifyRequest {

        userFirebase?: DecodedIdToken;

    }

}


