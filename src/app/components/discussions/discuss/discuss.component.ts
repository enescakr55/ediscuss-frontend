import { environment } from 'src/environments/environment.prod';
import { UserService } from './../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { DiscussDetailsModel } from './../../../models/discussDetailsModel';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserInfoModel } from 'src/app/models/userInfo';
import { map, timeout } from 'rxjs/operators';
function enablePopup(){
  setTimeout(()=>{
    let pop = $('.userFont') as any;
    pop.popup({
      inline     : true,
      hoverable  : true,
      position   : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
    })
  },200);
}
@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DiscussComponent implements OnInit {
  @Input() discuss:DiscussDetailsModel;
  @Input() setLine2:boolean = false;
  userInfoLoading:boolean = false;
  userInfo:UserInfoModel;
  mainPhotoUrl:string;
  currentUsername:string;
  constructor(private contentService:ContentServiceService,private toastrService:ToastrService,private router:Router,private userService:UserService) { }

  ngOnInit():void {
    enablePopup();
    this.mainPhotoUrl = environment.profilePhotoUrl;
    this.currentUsername = this.getUsernameFromLocalStorage() ?? "";
  }
  getUsernameFromLocalStorage(){
    var username = localStorage.getItem("user");
    return username;
  }
  deleteDiscuss(discussId:number){
      this.contentService.deleteDiscussion(discussId).subscribe(response=>{
        if(response.success){
          this.toastrService.success("Tartışma Silindi");
          this.router.navigate(['/discussions']);
        }else{
          this.toastrService.error(response.message ? response.message : "Bir hata oluştu");
        }
      });

  }
  getUserInfo(username:string){
    this.userInfoLoading = true;
    this.userService.getUserInfo(username).subscribe(response=>{
      this.userInfo = response.data;
      if(this.userInfo.profilePhotoPath == ""){
        this.userInfo.profilePhotoPath = "default-avatar.png";
      }
      console.log(response);
      this.userInfoLoading = false;
    });
  }
  getUser(){
    return localStorage.getItem("user");
  }

}
