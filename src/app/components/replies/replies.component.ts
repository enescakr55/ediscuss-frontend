import { ReplyDetailsModel } from './../../models/replyDetailsModel';
import { DiscussDetailsModel } from './../../models/discussDetailsModel';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {

  constructor(private contentService:ContentServiceService,private activatedRoute:ActivatedRoute) { }
  discussId:number;
  discuss:DiscussDetailsModel;
  replies:ReplyDetailsModel[];
  replyRefresh:boolean[] = [false];
  isAdded:boolean[] = [false];
  ngOnInit(): void {
    this.loadReplies();
  }
  loadReplies(){
    this.activatedRoute.params.subscribe(params=>{
      this.discussId = params['id'];
      this.contentService.getDiscussDetailsByDiscussId(this.discussId).subscribe(response=>{
        this.discuss = response.data;
      });
      this.contentService.getRepliesByDiscussionId(this.discussId).subscribe(response=>{
        this.replies = response.data;
        console.log(this.replies);
      })
    })
  }
  isAddedControl(){
    if(this.isAdded[0] == true){
      this.isAdded[0] = false;
      this.loadReplies();
    }
    if(this.replyRefresh[0] == true){
      this.replyRefresh[0] = false;
      this.loadReplies();
    }
  }


}
