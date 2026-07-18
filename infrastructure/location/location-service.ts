import type { LocationCapture } from "@/domain/boarding/boarding.types";
export class LocationService{
  async capture():Promise<LocationCapture>{if(!navigator.geolocation)return{status:"unavailable",failureReason:"unsupported"};return new Promise(resolve=>{navigator.geolocation.getCurrentPosition(p=>resolve({status:"captured",latitude:p.coords.latitude,longitude:p.coords.longitude,accuracyMeters:p.coords.accuracy}),e=>resolve({status:"unavailable",failureReason:e.code===1?"permission_denied":e.code===3?"timeout":"unknown"}),{enableHighAccuracy:true,timeout:8000,maximumAge:0})})}
  simulated():LocationCapture{return{status:"simulated",latitude:26.9124,longitude:75.7873,accuracyMeters:12}}
}
