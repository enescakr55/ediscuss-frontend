import { SignalrNotificationService } from './../../services/signalr-notification.service';
import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { UserInfoModel } from './../../models/userInfo';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ListenerService } from './../../services/listener.service';
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private signalrNotificationService:SignalrNotificationService, private listener:ListenerService,private authService:AuthService,private router:Router,private contentService:ContentServiceService,private toastrService:ToastrService) { }
  isLogged:boolean;
  loginSubscribe:any;
  currentUsername:string | null = "";
  userInfo:UserInfoModel;
  navbarScrollColor:boolean = false;
  ngOnInit(): void {
    this.updateIsLogged();
    this.getUsername();
    this.scrollListener();
    this.startSignalRNotification();
  }
  startSignalRNotification(){
    this.signalrNotificationService.startConnection();
  }
  getUsername(){
    if(this.isLogged){
      this.currentUsername = localStorage.getItem('user');
    }
  }
  updateIsLogged(){
    this.isLogged = this.authService.isLogged();
    this.loginSubscribe = this.listener.loggedUserStatus$.subscribe(response=>{
      if(response == 'true'){
        this.isLogged = true;
        this.getUsername();
      }else{
        this.isLogged = false;
      }
    })
  }
  logout(){
    this.listener.getLoggedUserStatus('false').subscribe();
    localStorage.clear();
    this.signalrNotificationService.stopConnection();
    this.router.navigate(['/login']);
  }
  scrollListener(){
    fromEvent(window,'scroll').subscribe((ev)=>{
      console.log("Scrolled");
      if(window.scrollY < 10){
        this.navbarScrollColor = false;
        let navbarLogo = document.getElementById('logoTextDiv') as HTMLDivElement
        navbarLogo.style.animation = 'logoTextAnimation2 2s';
        navbarLogo.style.animationDelay = '0.4s';
      }else{
        this.navbarScrollColor = true;
        let navbarLogo = document.getElementById('logoTextDiv') as HTMLDivElement
        navbarLogo.style.animation = 'none';
      }
    })
  }



}
