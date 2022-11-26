import { SingleResponseModel } from './../models/singleResponseModel';
import { UserInfoModel } from './../models/userInfo';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { UpdateUserModel } from './../models/updateUserModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  updateUser(updateUserModel:UpdateUserModel):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ResponseModel>(apiUrl+"users/updateprofile",updateUserModel);
  }
  updateProfilePicture(formData:FormData):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ResponseModel>(apiUrl+"users/changeprofilepicture",formData);
  }
  getUserInfo(username:string):Observable<SingleResponseModel<UserInfoModel>>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<SingleResponseModel<UserInfoModel>>(apiUrl+"users/getuserinfo?username="+username);
  }
}
