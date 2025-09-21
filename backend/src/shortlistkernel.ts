import * as admin from "firebase-admin";
const db = admin.firestore();

export const shortlistKernelFn = async (data:any) => {
  const { interviewId, tech, comm, fit, overrideYes, summary } = data;
  if (!interviewId) throw new Error("interviewId required");

  let decision: "shortlist"|"reject"|"pending";
  if (overrideYes || (tech && comm && fit)) decision = "shortlist";
  else if (!tech && !comm && !fit) decision = "reject";
  else decision = "pending";

  await db.collection("interviews").doc(interviewId).set({
    decision, summary: summary||null, updatedAt: Date.now()
  }, { merge: true });

  return { decision };
};
