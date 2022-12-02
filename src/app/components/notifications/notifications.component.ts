import {  Router } from '@angular/router';
import { NotificationModel } from './../../models/notificationModel';
import { StringFormatterService } from './../../services/string-formatter.service';
import { NotificationConstants } from './../../constants/notificationConstants';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from './../../services/notifications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationService:NotificationsService,private toastr:ToastrService,private stringFormatter:StringFormatterService,private router:Router) { }
  notificationList:NotificationModel[];

  ngOnInit(): void {

    this.getNotifications();

  }
  getNotifications(){
    this.notificationService.getMyNotifications().subscribe({
      next:(result)=>{
        this.notificationList = result.data;
      },
      error:()=>{
        this.toastr.error("Bildirimler alınırken bir hata oluştu");
      }
    })
  }
  notificationMessage(notificationModel:NotificationModel){
    var message = NotificationConstants.addReply;
    var json = JSON.parse(notificationModel.notificationValue);
    message = this.stringFormatter.FormatString(message,json);
    return message;
  }
  notificationDate(notificationModel:NotificationModel){

  }
  navigateToActionLink(notificationModel:NotificationModel){
    if(notificationModel.actionUrl != null && notificationModel.actionUrl != ""){
      this.router.navigate([notificationModel.actionUrl])
    }
  }

}
