import { DiscussFilterDto } from './../../models/discussFilterDto';
import { ActivatedRoute } from '@angular/router';
import { UserInfoModel } from './../../models/userInfo';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { DiscussDetailsModel } from './../../models/discussDetailsModel';
import { Component, Input, OnInit } from '@angular/core';
function enableDropdown(){
  let str = $('.ui.dropdown') as any;
  str.dropdown();
}
@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  @Input() discussType:string = 'all';
  @Input() filterValue:any;
  @Input() filterType:string;
  @Input() dList:DiscussDetailsModel[];
  filterDto:DiscussFilterDto = {discussTitle:"",onlyFavorites:false,subjects:[]};
  constructor(private contentService:ContentServiceService,private activatedRoute:ActivatedRoute) { }
  discussions:DiscussDetailsModel[];
  userInfo:UserInfoModel
  ngOnInit(): void {
    this.enableDropdownFnc()
    if(this.discussType == 'all'){
      this.contentService.getDiscussDetails().subscribe(response=>{
        this.discussions = response.data;
        console.log(this.discussions);
      })
    }else if(this.discussType == 'favorites'){
      this.contentService.getMyIntrestingDiscussions().subscribe(response=>{
        this.discussions = response.data;
      })

    }else if(this.discussType == 'my'){
      this.contentService.getMyDiscussDetails().subscribe(response=>{
        this.discussions = response.data;
        console.log(this.discussions);
      })
    }else if(this.discussType == 'filter'){
        this.activatedRoute.params.subscribe(params=>{
          this.filterValue = params['val'];
          this.filterType = params['type'];
          let val = parseInt(this.filterValue);
          this.contentService.getDiscussDetailsBySubjectId(val).subscribe(response=>{
            this.discussions = response.data;
            console.log(this.discussions);
          });
        })
    }
    this.getUserInfo();
  }
  enableDropdownFnc(){
    enableDropdown();
  }
  getFilterValue(){
    return this.filterValue;
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
  showFavorites(){
    this.contentService.getMyIntrestingDiscussions().subscribe(response=>{
      this.discussions = response.data;
      this.filterDto.onlyFavorites = true;
    })
  }
  showAll(){
    this.contentService.getDiscussDetails().subscribe(response=>{
      this.discussions = response.data;
      this.filterDto.onlyFavorites = false;
    })
  }
  filter(){
    this.contentService.getFilteredDiscussions(this.filterDto).subscribe({
      next:(response)=>{
        this.discussions = response.data;
      }
    })
  }

}
