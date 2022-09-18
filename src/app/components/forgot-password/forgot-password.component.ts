import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  username:string;
  wait:boolean = false;
  constructor(private authService:AuthService,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  sendResetCode(){
    this.wait = true;
    console.log(this.username);
    this.authService.sendResetPasswordCode(this.username).subscribe({
      next:(data)=>{
        this.wait = false;
        console.log(data);
        if(data.success){
          this.toastrService.success(data.message ? data.message : 'Sıfırlama kodu gönderildi');
        }else{
          this.wait = false;
          this.toastrService.error(data.message ? data.message : 'Şifre sıfırlama kodu gönderilemedi');
        }
      },
      error:(err)=>{
        this.wait = false;
        this.toastrService.error('İşlem başarısız');
      }
    })
  }

}
