import { type App, cert, initializeApp } from 'firebase-admin/app';

export const firebase: App = initializeApp({

    credential: cert("./src/firebase/hosptal-map-firebase-adminsdk-fbsvc-c89ab7353b.json"),

});

