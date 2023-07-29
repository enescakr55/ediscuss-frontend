import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowSavedCodeDto } from '../models/showSavedCodeDto';
import { environment } from 'src/environments/environment.prod';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SavedCodeService {

  constructor(private httpClient:HttpClient) { }
  getSavedCodeById(savedCodeId:number):Observable<SingleResponseModel<ShowSavedCodeDto>>{
    var apiUrl = environment.apiUrl;
    return this.httpClient.get<SingleResponseModel<ShowSavedCodeDto>>(apiUrl+'SavedCode/get?savedCodeId='+savedCodeId);
  }
}
