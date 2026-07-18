import Dexie,{type EntityTable} from "dexie";
import type { BoardingEventInput } from "@/domain/boarding/boarding.schemas";
export type CachedPass={token:string;passId:string;schoolId:string;studentId:string;cachedAt:string;expiresAt:string};
export type PendingEvent={localId:string;idempotencyKey:string;payload:BoardingEventInput;state:"pending"|"syncing"|"synced"|"needs_attention"|"rejected";attemptCount:number;lastAttemptAt?:string;lastError?:string;createdAt:string;serverEventId?:string};
export type DeviceContext={deviceId:string;selectedSchoolId:string;selectedRouteId:string;selectedVehicleId:string;driverUserId:string;lastSuccessfulSyncAt?:string};
export class SchoolRideDb extends Dexie{cachedPasses!:EntityTable<CachedPass,"token">;pendingEvents!:EntityTable<PendingEvent,"localId">;deviceContext!:EntityTable<DeviceContext,"deviceId">;constructor(){super("schoolride-tracker");this.version(1).stores({cachedPasses:"&token,schoolId,studentId",pendingEvents:"&localId,state,createdAt",deviceContext:"&deviceId"})}}
export const db=new SchoolRideDb();
