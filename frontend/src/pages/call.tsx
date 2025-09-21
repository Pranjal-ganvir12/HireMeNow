import { useNavigate, useParams } from "react-router-dom";
import CallRoom from "../components/CallRoom";
import React from "react";

export default function CallPage() {
  const { specId, candidateId } = useParams();
  const nav = useNavigate();

  const room = `HireMeNow-${specId}-${candidateId}`;
  const onEnd = () => {
    const interviewId = `${specId}-${candidateId}-${Date.now()}`;
    nav(`/summary/${encodeURIComponent(interviewId)}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">Call</h2>
      <CallRoom roomName={room} onEnd={onEnd} />
    </div>
  );
}
