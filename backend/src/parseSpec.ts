const KNOWN_SKILLS = [
    "python","java","javascript","typescript","react","node","aws",
    "gcp","docker","kubernetes","flask","django","spring","mysql","postgres"
  ];
  
  export const parseSpecFn = async (data: any) => {
    const { role = "", location = "", years = 0, skills = [], freeText = "" } = data;
    const exp = Number(years) || 0;
  
    const normalizedSkills = [
      ...new Set(
        String(freeText).toLowerCase().split(/[^a-z]+/)
          .filter(s => KNOWN_SKILLS.includes(s))
          .concat((skills||[]).map((s:string)=>s.toLowerCase()))
      )
    ];
  
    const hard = [];
    if (role) hard.push({ field: "role", op: "==", value: role.toLowerCase() });
    if (exp) hard.push({ field: "experience.python", op: ">=", value: exp });
    if (location) hard.push({ field: "location", op: "==", value: location.toLowerCase() });
  
    const soft = normalizedSkills.map(s => ({ field: "skill", op: "in", value: s, weight: 1 }));
    const tau = Math.min(3, soft.length || 0);
  
    return { ok: true, hard, soft, tau };
  };
  