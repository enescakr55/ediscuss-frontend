import { RemoteServerService } from './services/remote-server.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eDiscuss';
  constructor(private remoteServerService:RemoteServerService){}
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



