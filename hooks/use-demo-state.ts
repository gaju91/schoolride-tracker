"use client";
import { useSyncExternalStore } from "react";
import { getDemoState,subscribeDemoState } from "@/lib/demo-store";
let cachedRaw="";let cached=getDemoState();
function snapshot(){const raw=typeof window==="undefined"?"":localStorage.getItem("schoolride-demo-state-v1")??"";if(raw!==cachedRaw){cachedRaw=raw;cached=getDemoState()}return cached}
export const useDemoState=()=>useSyncExternalStore(subscribeDemoState,snapshot,()=>cached);
