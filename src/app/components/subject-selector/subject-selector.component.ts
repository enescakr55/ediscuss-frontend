import { ToastrService } from 'ngx-toastr';
import { FavoritesubjectsService } from './../../services/favoritesubjects.service';
import { CategorySubjects } from './../../models/categorySubjects';
import { Component, OnInit } from '@angular/core';
import { ContentServiceService } from 'src/app/services/content-service.service';

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.css']
})
export class SubjectSelectorComponent implements OnInit {

  constructor(private contentService:ContentServiceService,private favoriteSubjectService:FavoritesubjectsService,private toastrService:ToastrService) { }
  categorySubjects:CategorySubjects[];
  myCategorySubjects:CategorySubjects[];
  ngOnInit(): void {
    this.contentService.getCategorySubjects().subscribe(response=>{
      this.categorySubjects = response.data;
      console.log(this.categorySubjects);
    })
    this.getMyCategorySubjects();
  }
  getMyCategorySubjects(){
    this.contentService.getMyCategorySubjects().subscribe(response=>{
      this.myCategorySubjects=response.data;
    })
  }
  isSelected(subjectId:number){
    let response:boolean = false;
    if(this.myCategorySubjects){
      this.myCategorySubjects.forEach(element => {
        element.subject.forEach(sub=>{
          if(sub.subjectId==subjectId){
            response=true;
          }
        })
      })
    }
    return response;
  }
  addSubjectToFavorites(subjectId:number){
    this.favoriteSubjectService.addSubjectToFavorites(subjectId).subscribe((response)=>{
      if(response.success){
        this.toastrService.success("İlgilendiğiniz konu olarak işaretlendi");
        this.getMyCategorySubjects();
      }else{
        this.toastrService.error(response.message ? response.message : "Bir hata oluştu");
      }
    });
  }
  removeSubjectFromFavorites(subjectId:number){
    this.favoriteSubjectService.removeSubjectFromFavorites(subjectId).subscribe((response)=>{
      if(response.success){
        this.toastrService.success("İlgilendiğiniz konu kaldırıldı.");
        this.getMyCategorySubjects();
      }else{
        this.toastrService.error(response.message ? response.message : "Bir hata oluştu");
      }
    });
  }
  toggleFavorites(subjectId:number){
    if(this.isSelected(subjectId)){
      this.removeSubjectFromFavorites(subjectId);
    }else{
      this.addSubjectToFavorites(subjectId);
    }
  }

}
