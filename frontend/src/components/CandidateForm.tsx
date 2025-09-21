import { useState } from "react";
import { db, ensureDemoUser } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CandidateForm() {
  const [uid,setUid] = useState("");
  const [name,setName] = useState("");
  const [role,setRole] = useState("");
  const [location,setLocation] = useState("");
  const [skills,setSkills] = useState("");
  const [pyYears,setPyYears] = useState<number>(0);

  const save = async () => {
    await ensureDemoUser("demo@hiremenow.app","demo1234");
    if(!uid) return alert("Provide a unique ID");
    await setDoc(doc(db,"candidates",uid),{
      name, role:role.toLowerCase(), location:location.toLowerCase(),
      skills: skills.split(",").map(s=>s.trim().toLowerCase()),
      experience: { python: Number(pyYears||0) },
      updatedAt: Date.now()
    },{ merge:true });
    alert("Candidate saved ✅");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-3">
      <h2 className="text-2xl font-semibold">Candidate Profile</h2>
      <input className="border p-2 w-full" placeholder="Unique ID" value={uid} onChange={e=>setUid(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Skills CSV" value={skills} onChange={e=>setSkills(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Years Python" value={pyYears} onChange={e=>setPyYears(Number(e.target.value||0))} />
      <button onClick={save} className="px-4 py-2 bg-black text-white rounded">Save</button>
    </div>
  );
}
