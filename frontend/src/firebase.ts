import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// Config pulled from Firebase Console (Project settings)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Backend callable functions
export const callParseSpec = httpsCallable(functions, "parseSpec");
export const callMatchOne = httpsCallable(functions, "matchOne");
export const callTranscribe = httpsCallable(functions, "transcribeWhisper");
export const callSummarize = httpsCallable(functions, "summarizeTranscript");
export const callShortlist = httpsCallable(functions, "shortlistKernel");
export const callSendEmail = httpsCallable(functions, "sendEmailBrevo");

// Helper to always have a demo user signed in (so Firestore rules allow writes)
export const ensureDemoUser = async (email:string, pass:string) => {
  try {
    await signInWithEmailAndPassword(auth,email,pass);
  } catch {
    await createUserWithEmailAndPassword(auth,email,pass);
  }
};
