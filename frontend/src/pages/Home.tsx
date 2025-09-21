import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-slate-100">
      <h1 className="text-4xl font-bold mb-4">HireMeNow</h1>
      <p className="text-slate-700 mb-6">
        Omegle-style AI recruiting: instant matches, smart summaries.
      </p>
      <div className="flex gap-4">
        <Link to="/recruiter" className="px-6 py-3 bg-black text-white rounded-lg">Recruiter</Link>
        <Link to="/candidate" className="px-6 py-3 border rounded-lg">Candidate</Link>
      </div>
    </div>
  );
}
