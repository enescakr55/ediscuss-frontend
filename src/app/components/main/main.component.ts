import { ActivatedRoute, NavigationEnd, Router, UrlSegmentGroup } from '@angular/router';
import { UserInfoModel } from './../../models/userInfo';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userInfo:UserInfoModel;
  currentUrl:string;
  filter:boolean = false;
  filterValue:any;
  filterType:string;
  constructor(private contentService:ContentServiceService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.subscribeRoute();
    this.currentUrl = this.router.url;
    this.isFilterControl();
  }
  isFilterControl(){
    if(this.currentUrl.split('/')[2]=='filter'){
      this.filter = true;
    }
  }
  getUserInfo(){
    let currentUsername = localStorage.getItem('user');
    if(currentUsername){
    this.contentService.getUserInfo(currentUsername).subscribe(response=>{
      this.userInfo = response.data;
      console.log(response.data);
    })
    }
  }
  subscribeRoute(){
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd) {
        var url = val.url;
        console.log("url : "+url);
      }
    })
  }


}
