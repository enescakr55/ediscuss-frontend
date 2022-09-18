import { ContentServiceService } from 'src/app/services/content-service.service';
import { UserInfoModel } from './../../models/userInfo';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ListenerService } from './../../services/listener.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private listener:ListenerService,private authService:AuthService,private router:Router,private contentService:ContentServiceService) { }
  isLogged:boolean;
  loginSubscribe:any;
  currentUsername:string | null = "";
  userInfo:UserInfoModel;
  ngOnInit(): void {
    this.updateIsLogged();
    this.getUsername();

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
    this.router.navigate(['/login']);
  }



}
