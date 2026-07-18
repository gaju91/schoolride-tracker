import { spawnSync } from "node:child_process";
const url=process.env.SUPABASE_DB_URL;if(!url){console.error("SUPABASE_DB_URL is required. Copy .env.example and use the Supabase database connection string.");process.exit(1)}const result=spawnSync("psql",[url,"-v","ON_ERROR_STOP=1","-f","supabase/seed.sql"],{stdio:"inherit"});process.exit(result.status??1);
