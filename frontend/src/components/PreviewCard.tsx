import { useCountdown } from "../hooks/useCountDown";

export default function PreviewCard({ candidate, onYes, onNo }:{
  candidate:any; onYes:()=>void; onNo:()=>void;
}) {
  const t = useCountdown(120);
  return (
    <div className="border rounded p-4 bg-white/50 backdrop-blur">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{candidate?.name}</h3>
        <span className="text-sm border px-2 py-1 rounded">⏱ {t}s</span>
      </div>
      <p><b>Role:</b> {candidate.role}</p>
      <p><b>Skills:</b> {(candidate.skills||[]).join(", ")}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onNo} className="border px-4 py-2 rounded">No</button>
        <button onClick={onYes} className="bg-emerald-600 text-white px-4 py-2 rounded">Yes</button>
      </div>
    </div>
  );
}
