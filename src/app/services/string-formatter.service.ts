import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormatterService {

  constructor() { }
  FormatString(str:string,args:any):string{
    var keys = Object.keys(args)
    for(var i=0;i<keys.length;i++){
      str = str.replace(`{${keys[i]}}`,args[keys[i]]);
    }
    return str;
  }
}
