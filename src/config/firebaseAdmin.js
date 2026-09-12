import "dotenv/config";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId) {
  throw new Error("FIREBASE_PROJECT_ID is missing from .env");
}

if (!clientEmail) {
  throw new Error("FIREBASE_CLIENT_EMAIL is missing from .env");
}

if (!privateKey) {
  throw new Error("FIREBASE_PRIVATE_KEY is missing from .env");
}

const firebaseAdmin = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });

export const firebaseAuth = getAuth(firebaseAdmin);

export default firebaseAdmin;