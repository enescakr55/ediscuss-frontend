import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { Component, OnInit } from '@angular/core';
import { CategorySubjects } from 'src/app/models/categorySubjects';
import { Subject } from 'rxjs';
import { SubjectModel } from 'src/app/models/subjectModel';

@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})
export class AddDiscussionComponent implements OnInit {

  constructor(private contentService:ContentServiceService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
  boldText:string = "\n**Buraya yazı gelecek**";
  italicText:string = "\n*Buraya yazı gelecek*";
  codeText:string = "\n```\nBuraya kod yazabilirsiniz\n```";
  headingText:string = "\n## Buraya yazı gelecek";
  listText:string = "\n- Eleman1\n- Eleman2\n";
  imageText:string = "\n ![image](resim adresi)";
  linkText:string = "\n[Google](https://www.google.com)";
  preview:boolean = false;
  subjects:SubjectModel[];
  addDiscussionForm:FormGroup;
  ngOnInit(): void {
    this.contentService.getSubjects().subscribe(response=>{
      this.subjects = response.data;
    },error=>{
      console.log(error);
    })
    this.createAddDiscussionForm();
  }
  createAddDiscussionForm(){
    this.addDiscussionForm = this.formBuilder.group({
      discussId:[0],
      subjectId: ["",Validators.required],
      userId:[0],
      categoryId: [0],
      discussHeader: ['',Validators.required],
      discussDescription:['',Validators.required]
    })
  }
  submit(){
    if(this.addDiscussionForm.valid){

      let addDiscussionValues = Object.assign({},this.addDiscussionForm.value);
      this.contentService.addDiscussion(addDiscussionValues).subscribe(response=>{
        if(response.success){
          this.toastrService.success("Tartışma başarıyla eklendi");
          this.addDiscussionForm.reset();
        }else{
          if(response.message){
            this.toastrService.error(response.message);
          }else{
            this.toastrService.error("Konu eklenemedi");
          }
        }
      })
    }
  }
  addCustomText(str:string){
    let text = this.addDiscussionForm.controls['discussDescription'].value;
    this.addDiscussionForm.controls['discussDescription'].setValue(text+" "+str);
  }
  togglePreview(){
    this.preview = !this.preview;
  }
  getTextValue(){
    return this.addDiscussionForm.controls['discussDescription'].value;
  }
}
