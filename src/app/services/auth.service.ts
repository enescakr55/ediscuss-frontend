import { UserInfoModel } from './../models/userInfo';
import { ResetPasswordDtoModel } from './../models/resetPasswordDtoModel';
import { ResponseTokenModel } from './../models/responseTokenModel';
import { LoginModel } from './../models/loginModel';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/registerModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  register(registerModel:RegisterModel):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ResponseModel>(apiUrl+'auth/register',registerModel);
  }
  login(loginModel:LoginModel):Observable<SingleResponseModel<ResponseTokenModel>>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<SingleResponseModel<ResponseTokenModel>>(apiUrl+'auth/login',loginModel);
  }
  isLogged(){
    let expiration = window.localStorage.getItem("expiration");
    let token = window.localStorage.getItem("token");
    if(expiration && token){
      let expirationDate = new Date(expiration);
      if(expirationDate > new Date()){
        return true;
      }
    }
    return false;
  }
  sendResetPasswordCode(username:string):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ResponseModel>(apiUrl+'users/sendpasswordresetcode?username='+username);
  }
  resetPassword(req:ResetPasswordDtoModel):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.post<ResponseModel>(apiUrl+'users/resetpassword',req);
  }
  resetCodeControl(resetCode:string):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ResponseModel>(apiUrl+'users/resetcodecontrol?code='+resetCode);
  }
  getMyInfo(){
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<SingleResponseModel<UserInfoModel>>(apiUrl+"users/getmyinfo");
  }

}
