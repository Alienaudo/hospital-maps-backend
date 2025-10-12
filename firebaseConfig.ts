import { type App, cert, initializeApp } from 'firebase-admin/app';

const projectId = process.env.GCLOUD_PROJECT || "hosptal-map";

export const firebase: App = initializeApp({

    projectId,
    credential: cert("./src/firebase/hosptal-map-firebase-adminsdk-fbsvc-c89ab7353b.json"),

});

