import { useState } from "react";
import { useParams } from "react-router-dom";
import { callShortlist, callSummarize, callTranscribe, callSendEmail } from "../firebase";
import DecisionPanel from "../components/DecisionPanel";

export default function SummaryPage() {
  const { interviewId } = useParams();
  const [recording, setRecording] = useState<Blob|null>(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  const startRec = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    const chunks:BlobPart[] = [];
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = () => setRecording(new Blob(chunks,{type:"audio/webm"}));
    rec.start();
    setTimeout(()=>rec.stop(),10000); // auto-stop in 10s for demo
  };

  const doTranscribe = async () => {
    if (!recording) return;
    const b64 = await blobToBase64(recording);
    const res:any = await callTranscribe({ audioBase64: b64 });
    setTranscript(res.data.text || "");
  };

  const doSummarize = async () => {
    const res:any = await callSummarize({ transcript });
    setSummary(res.data.summary || "");
  };

  const handleDecision = async (d:any) => {
    const res:any = await callShortlist({ interviewId, ...d, summary });
    const decision = res.data.decision;
    await callSendEmail({ toEmail: "candidate@example.com", decision });
    alert(`Decision: ${decision}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Interview Summary</h2>
      <button onClick={startRec} className="border px-3 py-2 rounded">🎙 Record (10s demo)</button>
      <button onClick={doTranscribe} className="border px-3 py-2 rounded">📝 Transcribe</button>
      <button onClick={doSummarize} className="border px-3 py-2 rounded">✨ Summarize</button>
      <div>
        <p className="font-semibold">Transcript</p>
        <textarea className="border w-full p-2" rows={5} value={transcript} onChange={e=>setTranscript(e.target.value)} />
      </div>
      <div>
        <p className="font-semibold">Summary</p>
        <textarea className="border w-full p-2" rows={4} value={summary} onChange={e=>setSummary(e.target.value)} />
      </div>
      <DecisionPanel onDecide={handleDecision} />
    </div>
  );
}

function blobToBase64(b:Blob):Promise<string> {
  return new Promise((res,rej)=>{
    const r = new FileReader();
    r.onloadend = ()=>res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(b);
  });
}
