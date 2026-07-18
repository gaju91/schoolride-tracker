import { success } from "@/lib/api";import { dashboard,schools } from "@/lib/server-demo-store";
export async function GET(){return success(schools.map(s=>({...s,summary:dashboard(s.id).summary})))}
