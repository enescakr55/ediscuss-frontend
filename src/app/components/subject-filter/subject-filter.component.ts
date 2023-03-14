import { ActivatedRoute } from '@angular/router';
import { CategorySubjects } from './../../models/categorySubjects';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-filter',
  templateUrl: './subject-filter.component.html',
  styleUrls: ['./subject-filter.component.css']

})
export class SubjectFilterComponent implements OnInit {
  selectedVal:number = -1;
  constructor(private contentService:ContentServiceService,private activatedRoute:ActivatedRoute) { }
  categorySubjects:CategorySubjects[];
  loading:boolean;
  ngOnInit(): void {
    this.loadSubjects();
  }
  loadSubjects(){
    this.loading = true;
    this.contentService.getMyCategorySubjects().subscribe({
      next:(response) => {
        this.categorySubjects=response.data;
        this.loading = false;
      },
      error:(error) =>{
        this.loading = false;
      }
    })
    this.activatedRoute.params.subscribe(params=>{
      if(params['val']){
        this.selectedVal = parseInt(params['val']);
        console.log(this.selectedVal);
      }
    })
  }

}
