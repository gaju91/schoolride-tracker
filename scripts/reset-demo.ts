import { spawnSync } from "node:child_process";
const url=process.env.SUPABASE_DB_URL;if(!url){console.error("SUPABASE_DB_URL is required for database reset.");process.exit(1)}const result=spawnSync("psql",[url,"-v","ON_ERROR_STOP=1","-f","supabase/seed.sql"],{stdio:"inherit"});process.exit(result.status??1);
