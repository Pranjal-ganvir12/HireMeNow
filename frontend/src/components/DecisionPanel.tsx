import { useState } from "react";

export default function DecisionPanel({ onDecide }:{
  onDecide:(d:{tech:boolean;comm:boolean;fit:boolean;overrideYes:boolean})=>void;
}) {
  const [tech,setTech] = useState(false);
  const [comm,setComm] = useState(false);
  const [fit,setFit] = useState(false);
  const [overrideYes,setOverrideYes] = useState(false);

  return (
    <div className="border rounded p-3 space-y-2">
      <p className="font-semibold">Shortlisting Kernel</p>
      <div className="flex gap-4">
        <label><input type="checkbox" checked={tech} onChange={e=>setTech(e.target.checked)} /> Tech</label>
        <label><input type="checkbox" checked={comm} onChange={e=>setComm(e.target.checked)} /> Comm</label>
        <label><input type="checkbox" checked={fit} onChange={e=>setFit(e.target.checked)} /> Fit</label>
        <label><input type="checkbox" checked={overrideYes} onChange={e=>setOverrideYes(e.target.checked)} /> Override</label>
      </div>
      <button onClick={()=>onDecide({tech,comm,fit,overrideYes})} className="px-4 py-2 bg-black text-white rounded">Submit</button>
    </div>
  );
}
