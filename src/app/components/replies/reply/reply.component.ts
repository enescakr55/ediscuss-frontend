import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { MarkdownService, MermaidAPI } from 'ngx-markdown';
import { ReplyDetailsModel } from 'src/app/models/replyDetailsModel';
function enableDropdown(){
  let str = $('.ui.dropdown') as any;
  str.dropdown();
}
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply:ReplyDetailsModel;
  @Input() refresh:boolean[];
  constructor(private sanitizer:DomSanitizer,private markdownService:MarkdownService,private contentService:ContentServiceService,private toastrService:ToastrService) { }

  public options: MermaidAPI.Config = {
    fontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    logLevel: MermaidAPI.LogLevel.Info,
    theme: MermaidAPI.Theme.Dark,
  };
  ngOnInit(): void {
    this.enableDropdownn();
  }
  sanitizeHtmlContent(content:string){
    let sanitized = this.sanitizer.sanitize(SecurityContext.HTML, content);
    return sanitized ? sanitized : "";
    //return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  clearTagsTextContent(content:string){
    return ;
  }
  removeReply(replyId:number){
    this.contentService.deleteReply(replyId).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message ? response.message : "Yanıtınız silindi","İşlem Başarılı");
        this.refresh[0] = true;
      }else{
        this.toastrService.error(response.message ? response.message : "Yanıtınız silinemedi","İşlem Başarısız");
      }

    }
    )
  }
  enableDropdownn(){
    enableDropdown();
  }
 /* markdownRender(content:string){
    console.log("original");
    let c = this.markdownService.parse(content);
    console.log(c);
    console.log("----------------------------------------------------");
    //c = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let str = this.sanitizer.sanitize(SecurityContext.HTML, c) ;
    c = str ? str : "";
    console.log("sanitized")
    console.log(c);
    return c;
  }*/

}
