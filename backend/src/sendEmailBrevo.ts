import fetch from "node-fetch";

export const sendEmailBrevoFn = async (data:any) => {
  const KEY = process.env.BREVO_KEY;
  if (!KEY) throw new Error("Missing Brevo key");

  const { toEmail, decision } = data;
  if (!toEmail || !decision) throw new Error("toEmail and decision required");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "HireMeNow", email: "no-reply@hiremenow.app" },
      to: [{ email: toEmail }],
      subject: "Application Update",
      htmlContent: `<p>Status: <b>${decision.toUpperCase()}</b></p>`
    })
  });

  if (!res.ok) throw new Error(`Brevo email failed: ${res.status}`);
  return { ok: true };
};
