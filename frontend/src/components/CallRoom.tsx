import React from "react";
import { useEffect, useRef, useState } from "react";

declare global { interface Window { JitsiMeetExternalAPI: any } }

export default function CallRoom({ roomName, onEnd }:{
  roomName: string; onEnd: ()=>void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(300);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
        roomName,
        parentNode: ref.current!,
        userInfo: { displayName: "HireMeNow User" }
      });
      const interval = setInterval(()=>setT(s=>Math.max(0,s-1)),1000);
      const timeout = setTimeout(()=>{ api.executeCommand("hangup"); onEnd(); },300000);
      return () => { clearInterval(interval); clearTimeout(timeout); api.dispose(); };
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [roomName, onEnd]);

  return (
    <div className="space-y-2">
      <div className="text-sm border rounded px-2 py-1 w-fit">⏱ {t}s</div>
      <div ref={ref} className="h-[60vh] rounded overflow-hidden border"></div>
    </div>
  );
}
