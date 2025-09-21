import * as admin from "firebase-admin";
const db = admin.firestore();

export const matchOneFn = async (data: any) => {
  const { specId } = data;
  if (!specId) throw new Error("specId required");

  const specDoc = await db.collection("recruiterSpecs").doc(specId).get();
  if (!specDoc.exists) throw new Error("Spec not found");

  const spec = specDoc.data() as any;
  const { hard = [], soft = [], tau = 0 } = spec;

  const candidatesSnap = await db.collection("candidates").get();
  let best: any = null, bestScore = -1;

  // Helper to handle nested props like "experience.python"
  const getVal = (obj:any, path:string) =>
    path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  for (const doc of candidatesSnap.docs) {
    const c = doc.data();

    // Hard check
    const passHard = hard.every((h:any) => {
      const val = getVal(c, h.field);
      if (h.op === "==") return String(val||"").toLowerCase() === String(h.value).toLowerCase();
      if (h.op === ">=") return Number(val||0) >= Number(h.value);
      return false;
    });
    if (!passHard) continue;

    // Soft score
    const score = soft.reduce((s:number,p:any) => {
      if (p.field === "skill") {
        const skills = (c.skills||[]).map((x:string)=>x.toLowerCase());
        return s + (skills.includes(p.value.toLowerCase()) ? p.weight : 0);
      }
      return s;
    }, 0);

    if (score >= tau && score > bestScore) {
      best = { id: doc.id, ...c, score };
      bestScore = score;
    }
  }

  return best;
};
