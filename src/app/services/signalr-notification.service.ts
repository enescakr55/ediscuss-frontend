import { Router } from '@angular/router';
import { GuidGeneratorService } from './guid-generator.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NotificationPopModel } from '../models/notificationPopModel';
@Injectable({
  providedIn: 'root'
})
export class SignalrNotificationService {
  toastHistory:any = [];
  hubConnection:SignalR.HubConnection;
  socketApplication:string = "notifications";
  constructor(private toastrService:ToastrService,private domSanitizer:DomSanitizer,private router:Router) {}
  startConnection(){

    var expiration = localStorage.getItem("expiration") ?? ""
    var currentDate = new Date();
    var expirationDate = new Date(expiration);
    if(currentDate.getTime() < expirationDate.getTime()){
      var jwtToken:string = localStorage.getItem("token") ?? "";
      this.hubConnection = new SignalR.HubConnectionBuilder().withUrl(environment.socketServerUrl+this.socketApplication,{
        accessTokenFactory:()=>jwtToken
      }).withAutomaticReconnect().build();
      this.hubConnection.start().then(()=>this.startListeners())
    }else{
      setTimeout(()=>this.startConnection(),3000);
    }
  }
  stopConnection(){
    this.hubConnection.stop();
  }
  startListeners(){
    console.log("started");
    this.hubConnection.on("PopNotifications",(data:NotificationPopModel)=>{
      var guid = GuidGeneratorService.newGuid();
      this.toastHistory[guid] =this.toastrService.info(data.message,data.title,{progressBar:true,closeButton:true,enableHtml:true,toastClass:"ng-star-inserted ng-trigger ng-trigger-flyInOut ngx-toastr toast-info serviceNotificationClass",tapToDismiss:false,timeOut:5000,extendedTimeOut:1000,positionClass:"toast-bottom-left"});
      this.toastHistory[guid].onTap.subscribe((close:any) => { if(data.actionLink != null){ this.router.navigate([data.actionLink])} });
      this.toastHistory[guid].onHidden.subscribe((close:any) => { this.toastHistory[guid] = null, console.log(this.toastHistory) });
      console.log(data);
    })
  }

}
