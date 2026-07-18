import { NextResponse,type NextRequest } from "next/server";
const guards:Record<string,string>={"/super-admin":"super_admin","/admin":"school_admin","/driver":"driver","/parent":"parent"};
export function middleware(request:NextRequest){const entry=Object.entries(guards).find(([path])=>request.nextUrl.pathname.startsWith(path));if(!entry)return NextResponse.next();const role=request.cookies.get("demo_role")?.value;if(!role)return NextResponse.redirect(new URL("/?session=expired",request.url));if(role!==entry[1]&&!(role==="super_admin"&&entry[0]==="/admin"))return NextResponse.redirect(new URL("/",request.url));return NextResponse.next()}
export const config={matcher:["/super-admin/:path*","/admin/:path*","/driver/:path*","/parent/:path*"]};
