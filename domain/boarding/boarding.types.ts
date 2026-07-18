export type Role = "super_admin" | "school_admin" | "driver" | "parent";
export type EventStatus = "confirmed" | "pending_sync" | "route_mismatch" | "duplicate_rejected" | "unknown_pass_rejected" | "location_unavailable" | "sync_failed";
export type LocationStatus = "captured" | "unavailable" | "simulated";
export type StudentTokenRead = { token: string; source: "qr" | "nfc" | "demo"; readAt: string };
export interface StudentTokenReader { read(): Promise<StudentTokenRead> }
export type LocationCapture = {status:"captured";latitude:number;longitude:number;accuracyMeters:number;failureReason?:never}|{status:"simulated";latitude:number;longitude:number;accuracyMeters?:number;failureReason?:never}|{status:"unavailable";failureReason?:"permission_denied"|"timeout"|"unsupported"|"unknown";latitude?:never;longitude?:never;accuracyMeters?:never};
export type Student = { id:string; schoolId:string; name:string; grade:string; section:string; stop:string; routeId:string; routeName:string; parentUserId?:string; token?:string };
export type BoardingEvent = { id:string; schoolId:string; studentId?:string; studentPassId?:string; routeId:string; vehicleId:string; driverUserId:string; serviceDate:string; eventType:"boarding"; status:EventStatus; exceptionType?:string; occurredAt:string; receivedAt:string; location:LocationCapture; syncSource:"online"|"offline_queue"|"demo"; idempotencyKey:string; clientDeviceId:string; clientClockOffsetMs?:number };
export type Notification = { id:string; schoolId:string; parentUserId:string; studentId:string; boardingEventId:string; title:string; body:string; createdAt:string };
