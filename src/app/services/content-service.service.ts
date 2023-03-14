import { DiscussFilterDto } from './../models/discussFilterDto';
import { Observable } from 'rxjs';
import { SingleResponseModel } from './../models/singleResponseModel';
import { AppRoutingModule } from './../app-routing.module';
import { ReplyDetailsModel } from './../models/replyDetailsModel';
import { DiscussDetailsModel } from './../models/discussDetailsModel';
import { CategorySubjects } from './../models/categorySubjects';
import { environment } from './../../environments/environment.prod';
import { DiscussModel } from './../models/discussModel';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectModel } from '../models/subjectModel';
import { ResponseModel } from '../models/responseModel';
import { ReplyModel } from '../models/replyModel';
import { UserInfoModel } from '../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class ContentServiceService {

  constructor(private httpClient:HttpClient) { }
  getDiscussions(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<DiscussModel>>(apiUrl+'discussions/getall');
  }
  getRepliesByDiscussionId(discussionId:number){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<ReplyDetailsModel>>(apiUrl+'replies/getreplies?id='+discussionId);
  }
  getCategorySubjects(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<CategorySubjects>>(apiUrl+'subjects/getcategorysubjects');
  }
  getMyCategorySubjects(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<CategorySubjects>>(apiUrl+'subjects/getmycategorysubjects');
  }
  getDiscussDetails(page:number=0){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<DiscussDetailsModel>>(apiUrl+'discussions/getdiscussdetails?page='+page);
  }
  getMyDiscussDetails(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<DiscussDetailsModel>>(apiUrl+'discussions/getmydiscussions');
  }
  getDiscussDetailsByDiscussId(id:number){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<SingleResponseModel<DiscussDetailsModel>>(apiUrl+'discussions/getdiscussdetailsbyid?id='+id);
  }
  getDiscussDetailsBySubjectId(subjectId:number,page:number=0){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<DiscussDetailsModel>>(apiUrl+'discussions/getdiscussdetailsbysubjectid?subjectid='+subjectId+'&page='+page);
  }
  getMyIntrestingDiscussions(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<DiscussDetailsModel>>(apiUrl+'discussions/interestingdiscussions');
  }
  getDiscussionsByUsername(username:string){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<DiscussDetailsModel>>(apiUrl+"discussions/getuserdiscussions?username="+username);
  }
  getSubjects(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ListResponseModel<SubjectModel>>(apiUrl+'subjects/getsubjects');
  }
  addDiscussion(discuss:DiscussModel):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ResponseModel>(apiUrl+'discussions/addDiscuss',discuss);
  }
  addReply(reply:ReplyModel):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ResponseModel>(apiUrl+'replies/addReply',reply);
  }
  deleteReply(id:number):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ResponseModel>(apiUrl+'replies/delete?id='+id);
  }
  deleteDiscussion(id:number):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ResponseModel>(apiUrl+'discussions/delete?id='+id);
  }
  getUserInfo(username:string):Observable<SingleResponseModel<UserInfoModel>>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<SingleResponseModel<UserInfoModel>>(apiUrl+'users/getuserinfo?username='+username);
  }
  getFilteredDiscussions(filter:DiscussFilterDto){
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ListResponseModel<DiscussDetailsModel>>(apiUrl+'discussions/filterDiscussions',filter);
  }
}
