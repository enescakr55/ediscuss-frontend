import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteServerService {

  constructor(private httpClient:HttpClient) { }
  getRemoteCss(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get(apiUrl+"assets/getcss?name=default",{responseType:"text"});
  }
  }
