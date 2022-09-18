import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  private loggedUserStatusSource = new BehaviorSubject<string>('false');
  public loggedUserStatus$ = this.loggedUserStatusSource.asObservable();
  constructor(private authService:AuthService) {
    if(authService.isLogged()){
      this.getLoggedUserStatus('true');
    }
    this.loggedUserStatus$.subscribe(status => window.localStorage.setItem("loggedUserStatus",status));
   }
  getLoggedUserStatus(state:string):Observable<string>{
    let ts = window.localStorage.getItem("loggedUserStatus");
    ts = state;
    this.loggedUserStatusSource.next(ts);
    return this.loggedUserStatus$;
  }

}
