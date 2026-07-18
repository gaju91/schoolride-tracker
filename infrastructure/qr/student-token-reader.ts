import { BrowserQRCodeReader } from "@zxing/browser";
import type { StudentTokenRead,StudentTokenReader } from "@/domain/boarding/boarding.types";
export class QrStudentTokenReader implements StudentTokenReader{
  constructor(private readonly video:HTMLVideoElement){}
  async read():Promise<StudentTokenRead>{const reader=new BrowserQRCodeReader();const result=await reader.decodeOnceFromVideoDevice(undefined,this.video);return{token:result.getText(),source:"qr",readAt:new Date().toISOString()}}
}
export class DemoStudentTokenReader implements StudentTokenReader{constructor(private readonly token:string){}async read():Promise<StudentTokenRead>{return{token:this.token,source:"demo",readAt:new Date().toISOString()}}}
export class NfcStudentTokenReader implements StudentTokenReader{async read():Promise<StudentTokenRead>{throw new Error("Native NFC adapter not implemented in POC")}}
