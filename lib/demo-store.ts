"use client";
import { createInitialState,type DemoState } from "./demo-data";
const KEY="schoolride-demo-state-v1";const CHANNEL="schoolride-live";
export function getDemoState():DemoState{if(typeof window==="undefined")return createInitialState();const raw=localStorage.getItem(KEY);if(!raw){const state=createInitialState();localStorage.setItem(KEY,JSON.stringify(state));return state}try{return JSON.parse(raw) as DemoState}catch{return createInitialState()}}
export function setDemoState(next:DemoState){localStorage.setItem(KEY,JSON.stringify({...next,revision:next.revision+1}));window.dispatchEvent(new Event("schoolride-state"));new BroadcastChannel(CHANNEL).postMessage("updated")}
export function resetDemoState(){const state=createInitialState();localStorage.setItem(KEY,JSON.stringify(state));window.dispatchEvent(new Event("schoolride-state"));new BroadcastChannel(CHANNEL).postMessage("reset")}
export function subscribeDemoState(callback:()=>void){const channel=new BroadcastChannel(CHANNEL);const storage=()=>callback();channel.onmessage=callback;window.addEventListener("storage",storage);window.addEventListener("schoolride-state",storage);return()=>{channel.close();window.removeEventListener("storage",storage);window.removeEventListener("schoolride-state",storage)}}
