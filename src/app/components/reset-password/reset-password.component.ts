import { ResetPasswordDtoModel } from './../../models/resetPasswordDtoModel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }
  passwordResetModel:ResetPasswordDtoModel = {resetCode:"",newPassword:""};
  currentCode:string = "";
  codeStatus:number = 0; //0 Bekleniyor , 1 Başarılı , -1 Hata var
  newPass = "";
  ngOnInit(): void {
    this.getRoute();
  }
  getRoute(){
    this.activatedRoute.params.subscribe(response=>{
      this.currentCode = response['code'];
      this.authService.resetCodeControl(this.currentCode).subscribe({
        next:(data)=>{
          if(data.success){
            this.codeStatus = 1;
          }else{
            this.codeStatus = -1;
          }
        }
      })
    })
  }
  resetPassword(){
    this.passwordResetModel.resetCode = this.currentCode;
    this.passwordResetModel.newPassword = this.newPass;
    this.authService.resetPassword(this.passwordResetModel).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message ? response.message : 'Şifre başarıyla sıfırlandı');
      }else{
        this.toastrService.error(response.message ? response.message : 'Şifre sıfırlanamadı');
      }
    })
  }
}
