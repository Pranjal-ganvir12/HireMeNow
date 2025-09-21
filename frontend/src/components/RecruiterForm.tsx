import { useState } from "react";
import { callParseSpec, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function RecruiterForm() {
  const [role,setRole] = useState("");
  const [location,setLocation] = useState("");
  const [years,setYears] = useState<number>(0);
  const [skills,setSkills] = useState("");
  const [freeText,setFreeText] = useState("");
  const [parsed,setParsed] = useState<any>(null);
  const nav = useNavigate();

  const parse = async () => {
    const res:any = await callParseSpec({ role,location,years,skills:skills.split(","),freeText });
    setParsed(res.data);
  };

  const confirm = async () => {
    const docRef = await addDoc(collection(db,"recruiterSpecs"),{
      role,location,years,freeText,
      hard: parsed.hard, soft: parsed.soft, tau: parsed.tau,
      createdAt: Date.now()
    });
    nav(`/preview/${docRef.id}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <h2 className="text-2xl font-semibold">Recruiter Spec</h2>
      <input className="border p-2 w-full" placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Years" value={years} onChange={e=>setYears(Number(e.target.value))} />
      <input className="border p-2 w-full" placeholder="Skills CSV" value={skills} onChange={e=>setSkills(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Free text JD" value={freeText} onChange={e=>setFreeText(e.target.value)} />
      <button onClick={parse} className="bg-black text-white px-4 py-2 rounded">Parse</button>
      {parsed && <button onClick={confirm} className="bg-emerald-600 text-white px-4 py-2 rounded">Confirm & Match</button>}
      {parsed && <pre className="text-xs">{JSON.stringify(parsed,null,2)}</pre>}
    </div>
  );
}
