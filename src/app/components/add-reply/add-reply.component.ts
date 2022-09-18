import { MarkdownService } from 'ngx-markdown';
import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.css']
})
export class AddReplyComponent implements OnInit {
  @Input() discussId:number;
  @Input() isAdded:boolean[];
  constructor(private formBuilder:FormBuilder,private contentService:ContentServiceService,private toastrService:ToastrService,private markdownService:MarkdownService) { }
  boldText:string = "\n**Buraya yazı gelecek**";
  italicText:string = "\n*Buraya yazı gelecek*";
  codeText:string = "\n```\nBuraya kod yazabilirsiniz\n```";
  headingText:string = "\n## Buraya yazı gelecek";
  listText:string = "\n- Eleman1\n- Eleman2\n";
  linkText:string = "\n[Google](https://www.google.com)";
  imageText:string = "\n ![image](resim adresi)";
  addReplyForm:FormGroup;
  preview:boolean = false;
  ngOnInit(): void {
    this.createAddReplyForm();
  }
  addCustomText(str:string){
    let text = this.addReplyForm.controls['replyText'].value;
    this.addReplyForm.controls['replyText'].setValue(text+" "+str);
  }
  createAddReplyForm(){
    this.addReplyForm = this.formBuilder.group({
      discussId:[this.discussId],
      replyText: ['',Validators.required],
      userId:[0],
    })
  }
  submit(){
    if(this.addReplyForm.valid){

      let addReplyValues = Object.assign({},this.addReplyForm.value);
      this.contentService.addReply(addReplyValues).subscribe(response=>{
        if(response.success){
          this.toastrService.success("Cevap başarıyla eklendi");
          this.isAdded[0] = true;
          this.addReplyForm.controls['replyText'].setValue('');
        }else{
          if(response.message){
            this.toastrService.error(response.message);
          }else{
            this.toastrService.error("Cevap eklenemedi");
          }
        }
      })
    }else{
      this.toastrService.error("Formu kontrol edin")
    }
  }
  getTextValue(){
    return this.addReplyForm.controls['replyText'].value;
  }
  togglePreview(){
    this.preview = !this.preview;
  }

}
