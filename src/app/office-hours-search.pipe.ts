import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'officeHoursSearch'
})
export class OfficeHoursSearchPipe implements PipeTransform {

  transform(value: any, args?:any): any {
    
    if(!value) return null;
    if(!args)return value; //return all table (args=>input search)
    args=args.toLowerCase();
    return value.filter((item:any)=>{
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}
