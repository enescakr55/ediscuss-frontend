import { RemoteServerService } from './services/remote-server.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eDiscuss';
  constructor(private remoteServerService:RemoteServerService,private translateService:TranslateService){
    this.translateService.addLangs(["tr"]);
    this.translateService.use("tr");
  }
  ngOnInit(){
    this.getCSS();

  }
  getCSS(){
      setTimeout(() => {
        this.remoteServerService.getRemoteCss().subscribe((response) => {
          let style = document.createElement('style');
          style.id = 'customStyle';
          style.innerHTML = response;
          document.head.appendChild(style);
        });
      }, 100);
  }

}



