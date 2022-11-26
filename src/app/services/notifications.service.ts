import { NotificationModel } from './../models/notificationModel';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpClient:HttpClient) { }
  getMyNotifications():Observable<ListResponseModel<NotificationModel>>{
    let apiUrl = environment.apiUrl;
    let requestUrl = apiUrl+"notifications/getnotifications";
    return this.httpClient.get<ListResponseModel<NotificationModel>>(requestUrl);
  }
}
