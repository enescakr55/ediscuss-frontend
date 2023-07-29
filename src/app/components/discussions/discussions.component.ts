import { DiscussFilterDto } from './../../models/discussFilterDto';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoModel } from './../../models/userInfo';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { DiscussDetailsModel } from './../../models/discussDetailsModel';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
//import * as dropdown  from '../../../assets/dropdown.js'
function enableDropdown(){
  let str = $('.ui.discussDropdown') as any;
  str.dropdown();
}
@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiscussionsComponent implements OnInit {
  @Input() discussType:string = 'all';
  @Input() filterValue:any;
  @Input() filterType:string;
  @Input() dList:DiscussDetailsModel[];
  page:number = 0;
  discussionsTitle:string = "Tartışmalar";
  loading:boolean = true;
  pageLoading:boolean = false;
  filterDto:DiscussFilterDto = {discussTitle:"",onlyFavorites:false,subjects:[]};
  constructor(private contentService:ContentServiceService,private activatedRoute:ActivatedRoute,private router:Router) { }
  discussions:DiscussDetailsModel[];
  userInfo:UserInfoModel
  ngOnInit(): void {
    this.page = 0;
    this.enableDropdownFnc()
    this.getDiscussions();
    this.getUserInfo();
  }
  enableDropdownFnc(){
    enableDropdown();
  }
  getDiscussions(requestPage:boolean = true){
    if(requestPage){
      this.pageLoading = true;
    }
    console.log(this.discussType),
    console.log(this.page)
    if(this.discussType == 'all'){
      this.contentService.getDiscussDetails(this.page).subscribe(response=>{
        this.discussions = response.data;
        console.log(this.discussions);
        this.discussionsTitle="Tartışmalar";
        this.loading = false;
        this.pageLoading = false;
      })
    }else if(this.discussType == 'favorites'){
      this.contentService.getMyIntrestingDiscussions().subscribe(response=>{
        this.discussions = response.data;
        this.loading = false;
        this.pageLoading = false;
      })

    }else if(this.discussType == 'my'){
      this.contentService.getMyDiscussDetails().subscribe(response=>{
        this.discussions = response.data;
        this.discussionsTitle="Tartışmalarım";
        console.log(this.discussions);
        this.loading = false;
      })
    }else if(this.discussType == 'filter'){
        this.activatedRoute.params.subscribe(params=>{
          this.filterValue = params['val'];
          this.filterType = params['type'];
          let val = parseInt(this.filterValue);

          this.contentService.getDiscussDetailsBySubjectId(val,this.page).subscribe(response=>{
            this.discussions = response.data;
            console.log(this.discussions);
            this.loading = false;
            this.pageLoading = false;
          });
        })
    }else if(this.discussType == 'userdiscussions'){
      let username:string = "";
      this.activatedRoute.params.subscribe(params=>{
        username = params['username'];
      })
      this.contentService.getDiscussionsByUsername(username).subscribe({
        next:(result)=>{
          this.discussionsTitle = "@"+username +"'in Tartışmaları";
          this.discussions = result.data;
          this.loading = false;
          this.pageLoading = false;
        }
      })
    }
  }
  nextPage(){
    this.page++;
    this.getDiscussions();
  }
  previousPage(){
    if(this.page > 0){
      this.page--;
      this.getDiscussions();
    }

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
    this.router.navigate(['/discussions/advancedFilter']);
  }
  showAll(){
    this.contentService.getDiscussDetails().subscribe(response=>{
      this.discussions = response.data;
      this.filterDto.onlyFavorites = false;
    })
    this.router.navigate(['/discussions/advancedFilter']);
  }
  filter(){

    this.contentService.getFilteredDiscussions(this.filterDto).subscribe({
      next:(response)=>{
        this.discussions = response.data;
      }
    })
    this.router.navigate(['/discussions/advancedFilter']);
  }

}
