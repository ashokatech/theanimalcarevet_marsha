'use client';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
export function Choice({name,label,options,value,onChange}:{name:string,label:string,options:{value:string,label:string}[],value?:string,onChange?:(v:string)=>void}){return <label className="field">{label}<Select name={name} required value={onChange?value:undefined} defaultValue={onChange?undefined:value} onValueChange={onChange}><SelectTrigger className="w-full h-11"><SelectValue placeholder="Select…"/></SelectTrigger><SelectContent>{options.map(o=><SelectItem value={o.value} key={o.value}>{o.label}</SelectItem>)}</SelectContent></Select></label>}
export function Field({label,name,type='text',required=true,value,min}:{label:string,name:string,type?:string,required?:boolean,value?:string,min?:string}){return <label className="field">{label}<input name={name} type={type} required={required} defaultValue={value} min={min}/></label>}
export const today=()=>new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
export const money=(n:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(n/100);

