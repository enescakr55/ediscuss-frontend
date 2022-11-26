import { UserService } from './../../../../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserInfoModel } from './../../../../models/userInfo';
import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UpdateUserModel } from 'src/app/models/updateUserModel';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  env = environment
  myInfo:UserInfoModel;
  profileEditForm:FormGroup;
  profilePictureName:string = "default-avatar.png";
  constructor(private toastrService:ToastrService,private authService:AuthService,private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.getMyInfo();
  }
  createProfileEditForm(){
    this.profileEditForm = this.formBuilder.group({
      firstName:[this.myInfo.firstName,Validators.required],
      lastName:[this.myInfo.lastName,Validators.required],
      email:[this.myInfo.email,Validators.required]
    })
  }
  editProfile(){
    console.log("here")
    if(this.profileEditForm.valid){
      var userinfo:UpdateUserModel = Object.assign({},this.profileEditForm.value);
      this.userService.updateUser(userinfo).subscribe({
        next:(response)=>{
          if(response.success){
            this.toastrService.success(response.message);
          }else{
            this.toastrService.error(response.message);
          }
        },
        error:(err)=>{
          this.toastrService.error("Bir hata oluştu");
        }
      })
    }else{
      this.toastrService.error("Formu kontrol edin");
    }
  }
  changePhoto(){
    var selector = document.getElementById("profilePictureSelector") as HTMLInputElement;
    selector.click();
  }
  getMyInfo(){
    this.authService.getMyInfo().subscribe(response=>{
      this.myInfo = response.data
      if(response.data.profilePhotoPath != ""){
        this.profilePictureName = response.data.profilePhotoPath;
      }

      console.log(this.myInfo)
      this.createProfileEditForm();
    })
  }
  getFile(imageInput:any){
    const file:File = imageInput.files[0];
    var formData = new FormData();
    formData.append("picture",file);
    this.userService.updateProfilePicture(formData).subscribe({
      next:(response)=>{
        if(response.success){
          this.toastrService.success(response.message);
          this.getMyInfo();
        }else{
          this.toastrService.error("Bir hata oluştu");
          this.getMyInfo();
        }
      }
    })
  }

}
