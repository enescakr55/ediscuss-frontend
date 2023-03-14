import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from 'src/app/services/content-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  Input,
  OnInit,
  Sanitizer,
  SecurityContext,
} from '@angular/core';
import { MarkdownService, MermaidAPI } from 'ngx-markdown';
import { ReplyDetailsModel } from 'src/app/models/replyDetailsModel';
import { UserInfoModel } from 'src/app/models/userInfo';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
function enableDropdown() {
  let str = $('.ui.dropdown') as any;
  str.dropdown();
}
function enablePopup(){
  setTimeout(()=>{
    let pop = $('.userFont') as any;
    pop.popup({
      inline     : true,
      hoverable  : true,
      position   : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
    })
  },200);
}
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit {
  @Input() reply: ReplyDetailsModel;
  @Input() refresh: boolean[];
  userInfoLoading:boolean = false;
  userInfo:UserInfoModel;
  mainPhotoUrl:string;
  currentUsername: string | null = '';
  constructor(
    private sanitizer: DomSanitizer,
    private markdownService: MarkdownService,
    private contentService: ContentServiceService,
    private toastrService: ToastrService,
    private userService:UserService
  ) {}

  public options: MermaidAPI.Config = {
    fontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    logLevel: MermaidAPI.LogLevel.Info,
    theme: MermaidAPI.Theme.Dark,
  };
  ngOnInit(): void {
    enablePopup();
    this.mainPhotoUrl = environment.profilePhotoUrl;
    this.enableDropdownn();
    this.currentUsername = localStorage.getItem('user');
  }
  getUserInfo(username:string){
    this.userInfoLoading = true;
    this.userService.getUserInfo(username).subscribe(response=>{
      this.userInfo = response.data;
      if(this.userInfo.profilePhotoPath == ""){
        this.userInfo.profilePhotoPath = "default-avatar.png";
      }
      console.log(response);
      this.userInfoLoading = false;
    });
  }
  sanitizeHtmlContent(content: string) {
    let sanitized = this.sanitizer.sanitize(SecurityContext.HTML, content);
    return sanitized ? sanitized : '';
    //return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  clearTagsTextContent(content: string) {
    return;
  }
  removeReply(replyId: number) {
    this.contentService.deleteReply(replyId).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(
          response.message ? response.message : 'Yanıtınız silindi',
          'İşlem Başarılı'
        );
        this.refresh[0] = true;
      } else {
        this.toastrService.error(
          response.message ? response.message : 'Yanıtınız silinemedi',
          'İşlem Başarısız'
        );
      }
    });
  }
  enableDropdownn() {
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
