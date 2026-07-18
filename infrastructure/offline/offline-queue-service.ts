import { db,type PendingEvent } from "./db";
import type { BoardingEventInput } from "@/domain/boarding/boarding.schemas";
const DELAYS=[2000,5000,10000,30000,60000];
export class OfflineQueueService{
 async enqueue(payload:BoardingEventInput){const localId=crypto.randomUUID();const row:PendingEvent={localId,idempotencyKey:payload.idempotencyKey,payload,state:"pending",attemptCount:0,createdAt:new Date().toISOString()};await db.pendingEvents.add(row);return row}
 async pending(){return db.pendingEvents.where("state").anyOf("pending","needs_attention").sortBy("createdAt")}
 async retry(submit:(payload:BoardingEventInput)=>Promise<{eventId:string}>){const items=await this.pending();for(const item of items){if(item.attemptCount>=5)continue;await db.pendingEvents.update(item.localId,{state:"syncing",lastAttemptAt:new Date().toISOString()});try{const result=await submit({...item.payload,syncSource:"offline_queue"});await db.pendingEvents.update(item.localId,{state:"synced",serverEventId:result.eventId,lastError:undefined})}catch(error){const attempts=item.attemptCount+1;await db.pendingEvents.update(item.localId,{state:attempts>=5?"needs_attention":"pending",attemptCount:attempts,lastError:error instanceof Error?error.message:"Sync failed"});if(attempts<5)await new Promise(resolve=>setTimeout(resolve,Math.min(DELAYS[attempts-1],25)))}}}
 async clear(){await db.pendingEvents.clear()}
}
