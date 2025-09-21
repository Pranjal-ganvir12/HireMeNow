import fetch from "node-fetch";

export const summarizeTranscriptFn = async (data:any) => {
  const HF = process.env.HF_TOKEN;
  if (!HF) throw new Error("Missing HuggingFace token");

  const { transcript } = data;
  if (!transcript) throw new Error("Transcript required");

  const res = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: "POST",
    headers: { Authorization: `Bearer ${HF}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: String(transcript).slice(0,3800) })
  });

  // 👇 Cast JSON to possible HuggingFace outputs
  const out = (await res.json()) as { summary_text?: string }[] | { summary_text?: string };

  let summary = "";
  if (Array.isArray(out)) summary = out[0]?.summary_text ?? "";
  else summary = out.summary_text ?? "";

  if (!summary) throw new Error("Summarization failed");
  return { summary };
};
