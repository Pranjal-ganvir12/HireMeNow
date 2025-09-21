import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callMatchOne } from "../firebase";
import PreviewCard from "../components/PreviewCard";

export default function PreviewPage() {
  const { specId } = useParams();
  const [candidate, setCandidate] = useState<any>(null);
  const nav = useNavigate();

  const fetchCandidate = async () => {
    const res:any = await callMatchOne({ specId });
    setCandidate(res.data || null);
  };

  useEffect(() => { fetchCandidate(); }, [specId]);

  const onNo = () => fetchCandidate();
  const onYes = () => {
    if (candidate) nav(`/call/${specId}/${candidate.id}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Candidate Preview</h2>
      {!candidate ? <p>Finding candidate...</p> :
        <PreviewCard candidate={candidate} onYes={onYes} onNo={onNo} />}
    </div>
  );
}
