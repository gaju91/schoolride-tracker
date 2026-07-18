declare module "pdfkit" {
  type Options={size?:string;margin?:number};
  export default class PDFDocument {
    constructor(options?:Options);pipe(stream:NodeJS.WritableStream):NodeJS.WritableStream;fontSize(size:number):this;fillColor(color:string):this;text(text:string,xOrOptions?:number|{align?:string},y?:number,options?:{width?:number}):this;roundedRect(x:number,y:number,w:number,h:number,r:number):this;lineWidth(width:number):this;stroke(color:string):this;image(path:string,x:number,y:number,options:{width:number}):this;end():void;
  }
}
