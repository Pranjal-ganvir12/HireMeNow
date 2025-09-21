import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { parseSpecFn } from "./parseSpec";
import { matchOneFn } from "./matchOne";
import { transcribeWhisperFn } from "./transcribeWhisper";
import { summarizeTranscriptFn } from "./summarizeTranscript";
import { shortlistKernelFn } from "./shortlistKernel";
import { sendEmailBrevoFn } from "./sendEmailBrevo";

admin.initializeApp();

export const parseSpec = functions.https.onCall(parseSpecFn);
export const matchOne = functions.https.onCall(matchOneFn);
export const transcribeWhisper = functions.https.onCall(transcribeWhisperFn);
export const summarizeTranscript = functions.https.onCall(summarizeTranscriptFn);
export const shortlistKernel = functions.https.onCall(shortlistKernelFn);
export const sendEmailBrevo = functions.https.onCall(sendEmailBrevoFn);
