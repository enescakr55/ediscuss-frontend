import { RegisterModel } from './../../models/registerModel';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private router:Router) { }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  register(){
    if(this.registerForm.valid){
      let formValues:RegisterModel = Object.assign({},this.registerForm.value);
      this.authService.register(formValues).subscribe(response=>{
        if(response.success){
          this.toastrService.success("Kayıt başarılı");
          this.router.navigate(['/login']);
        }else{
          this.toastrService.error("Hata oluştu");
        }
      })
    }
  }



}
