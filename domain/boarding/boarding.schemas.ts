import { z } from "zod";
export const locationSchema=z.discriminatedUnion("status",[
  z.object({status:z.literal("captured"),latitude:z.number().min(-90).max(90),longitude:z.number().min(-180).max(180),accuracyMeters:z.number().nonnegative()}),
  z.object({status:z.literal("simulated"),latitude:z.number().min(-90).max(90),longitude:z.number().min(-180).max(180),accuracyMeters:z.number().nonnegative().optional()}),
  z.object({status:z.literal("unavailable"),failureReason:z.enum(["permission_denied","timeout","unsupported","unknown"]).optional()})
]);
export const resolvePassSchema=z.object({schoolId:z.string().uuid(),routeId:z.string().uuid(),token:z.string().min(8).max(200),source:z.enum(["qr","nfc","demo"])});
export const boardingEventSchema=z.object({idempotencyKey:z.string().min(8).max(200),schoolId:z.string().uuid(),studentId:z.string().uuid(),studentPassId:z.string().uuid(),routeId:z.string().uuid(),vehicleId:z.string().uuid(),driverUserId:z.string().uuid(),eventType:z.literal("boarding"),occurredAt:z.string().datetime({offset:true}),location:locationSchema,syncSource:z.enum(["online","offline_queue","demo"]),clientDeviceId:z.string().min(3).max(100),allowRouteMismatch:z.boolean().default(false)});
export const syncSchema=z.object({deviceId:z.string().min(3),events:z.array(boardingEventSchema.extend({localId:z.string().uuid()})).min(1).max(50)});
export type BoardingEventInput=z.infer<typeof boardingEventSchema>;
