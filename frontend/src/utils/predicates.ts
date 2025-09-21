export type Hard = { field: string; op: "==" | ">="; value: any };
export type Soft = { field: string; op: "in"; value: any; weight: number };

export const formatSpec = (hard: Hard[], soft: Soft[], tau: number) => ({
  hard, soft, tau
});
