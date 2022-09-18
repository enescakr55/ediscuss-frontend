import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SystemInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    if(token != null){
      let newRequest:HttpRequest<any>;
      newRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
