import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { DiscussDetailsModel } from './../../../models/discussDetailsModel';
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css']
})
export class DiscussComponent implements OnInit {
  @Input() discuss:DiscussDetailsModel;
  @Input() setLine2:boolean = false;
  constructor(private contentService:ContentServiceService,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
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
  getUser(){
    return localStorage.getItem("user");
  }

}
