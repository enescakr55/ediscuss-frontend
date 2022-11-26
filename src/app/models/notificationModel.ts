export interface NotificationModel {
  notificationId:number;
  triggeredUserId:number;
  receiverId:number;
  notificationIcon:string;
  notificationType:number;
  notificationValue:string;
  actionUrl:string;
  isRead:boolean;
  sendDate:string;
}
