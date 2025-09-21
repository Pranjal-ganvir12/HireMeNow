import fetch from "node-fetch";

export const transcribeWhisperFn = async (data: any) => {
  const HF = process.env.HF_TOKEN;
  if (!HF) throw new Error("Missing HuggingFace token");

  const { audioBase64 } = data;
  if (!audioBase64) throw new Error("audioBase64 required");

  const buf = Buffer.from(audioBase64.split(",").pop() || "", "base64");

  const res = await fetch("https://api-inference.huggingface.co/models/openai/whisper-base", {
    method: "POST",
    headers: { Authorization: `Bearer ${HF}` },
    body: buf
  });

  const out = await res.json();
  if (!out.text) throw new Error("Whisper failed");
  return { text: out.text };
};
