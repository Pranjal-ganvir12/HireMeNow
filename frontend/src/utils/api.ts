import { callParseSpec, callMatchOne, callTranscribe, callSummarize, callShortlist, callSendEmail } from "../firebase";

export const Api = {
  parseSpec: (input:any) => callParseSpec(input),
  matchOne: (specId:string) => callMatchOne({ specId }),
  transcribe: (audioBase64:string) => callTranscribe({ audioBase64 }),
  summarize: (transcript:string) => callSummarize({ transcript }),
  shortlist: (payload:any) => callShortlist(payload),
  sendEmail: (toEmail:string, decision:string) => callSendEmail({ toEmail, decision }),
};
