import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FavoritesubjectsService {

  constructor(private httpClient:HttpClient) { }
  addSubjectToFavorites(subjectId:number):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ResponseModel>(apiUrl+'usersubjects/addinteresting?subjectid='+subjectId);
  }
  removeSubjectFromFavorites(subjectId:number):Observable<ResponseModel>{
    let apiUrl = environment.apiUrl;
    return this.httpClient.get<ResponseModel>(apiUrl+'usersubjects/deleteinteresting?subjectid='+subjectId);
  }
}
