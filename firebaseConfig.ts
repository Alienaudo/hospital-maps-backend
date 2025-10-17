import { type App, cert, initializeApp } from 'firebase-admin/app';

const projectId: string = process.env.GCLOUD_PROJECT || "hosptal-map";
const serviceAccountPath: string = process.env.SERVICE_ACCOUNT_PATH || "./src/firebase/serviceAccount.json";

export const firebase: App = initializeApp({

    projectId,
    credential: cert(serviceAccountPath),

});

