import type { BoardingEvent, Student } from "./boarding.types";
export type ValidationResult={ok:true;status:"confirmed"|"route_mismatch"}|{ok:false;code:"ROUTE_MISMATCH"|"STUDENT_ALREADY_BOARDED"};
export function validateBoarding(student:Student,routeId:string,events:BoardingEvent[],allowRouteMismatch=false):ValidationResult{
  const duplicate=events.find(e=>e.studentId===student.id&&e.serviceDate===new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"})&&["confirmed","location_unavailable","route_mismatch"].includes(e.status));
  if(duplicate)return{ok:false,code:"STUDENT_ALREADY_BOARDED"};
  if(student.routeId!==routeId&&!allowRouteMismatch)return{ok:false,code:"ROUTE_MISMATCH"};
  return{ok:true,status:student.routeId===routeId?"confirmed":"route_mismatch"};
}
export const scopeToSchool=<T extends {schoolId:string}>(rows:T[],schoolId:string)=>rows.filter(row=>row.schoolId===schoolId);
