import { NextResponse } from "next/server";
export const success=<T>(data:T,status=200)=>NextResponse.json({ok:true,data},{status});
export const failure=(code:string,message:string,status=400,details?:Record<string,unknown>)=>NextResponse.json({ok:false,error:{code,message,...(details?{details}:{})}},{status});
