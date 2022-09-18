import { ListenerService } from './../../services/listener.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService,private formBuilder:FormBuilder,private listener:ListenerService) { }
  loginForm:FormGroup;
  loginSubscribe:any;
  loading:boolean = false;
  ngOnInit(): void {
    this.createLoginForm();

  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })

  }
  login(){
    if(this.loginForm.valid){
      this.loading = true;
      let loginValues = Object.assign({},this.loginForm.value);
      this.authService.login(loginValues).subscribe({
        error:(err)=>{
          this.loading = false;
          this.toastrService.error("Giriş başarısız");
        },
        next:(response)=>{
        if(response.success){
          console.log(response);
          this.toastrService.success("Giriş başarılı");
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("user",response.data.username);
          localStorage.setItem("email",response.data.email);
          localStorage.setItem("expiration",response.data.expiration);
          this.updateLoggedUserStatus('true')
          this.router.navigate(['/']);
        }else{
          if(response.message){
            this.toastrService.error(response.message);
          }else{
            this.toastrService.error("Giriş başarısız");
          }
        }
        this.loading=false;
      }


      })
    }
  }
  updateLoggedUserStatus(state:string){
    if(this.loginSubscribe){
      this.loginSubscribe.unsubscribe();
    }
    this.loginSubscribe = this.listener.getLoggedUserStatus(state).subscribe();
  }

}
