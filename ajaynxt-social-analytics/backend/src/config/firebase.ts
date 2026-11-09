import admin from 'firebase-admin';
import { config } from './environment';

if (!admin.apps.length) {
  if (config.firebase.clientEmail && config.firebase.privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey,
      }),
    });
  } else {
    // In Google Cloud Run, default application credentials from the metadata server are used
    admin.initializeApp({
      projectId: config.firebase.projectId,
    });
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
export default admin;
