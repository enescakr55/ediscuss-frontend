import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor() { }
  text1:string = "milyonlarca yazılımcıyla birlik olarak kodlama hatalarını çözmeni hedefler.";
  text2:string = "üzerinde tanımlanmış konulardan ilginizi çekenleri seçerek deneyiminizi kişiselleştirebilirsiniz.";
  text3:string = "Platform üzerinde sorularınız ve yanıtlarınız için markdown desteği sağlanmaktadır. Bu sayede anlatmak istediklerinizi daha görsel bir şekilde anlatabilirsiniz.";
  logoTexts:string[] = ["Yazılımcı Dayanışma Platformu","Hata mı var ?","</bug>'a sorun"]
  ngOnInit(): void {
    //this.typeWriter(this.text1,"text1",0,true);
    //this.typeWriter(this.text2,"text2",0);
    //this.typeWriter(this.text3,"text3",0);
    //this.arrayTypeWriter(this.logoTexts,"logoText",0,0);
  }
  typeWriter(text:string,elementId:string,i=0,infinite:boolean=false){
    let element = document.getElementById(elementId) as HTMLDivElement
    if(i == 0){
      element.innerHTML = "";
    }
    element.innerHTML+=text.charAt(i);
    i++;
    if(i == text.length){
      i=0;
      setTimeout(()=>this.typeWriter(text,elementId,i),1000);
      return
      console.log(i);
    }
    if(i<text.length){
      setTimeout(()=>this.typeWriter(text,elementId,i),120);
    }

  }
  arrayTypeWriter(text:string[],elementId:string,i=0,arr=0){
    let element = document.getElementById(elementId) as HTMLDivElement
    if(i == 0){
      element.innerHTML = "";
    }
    element.innerHTML+=text[arr].charAt(i);
    i++;
    if(i == text[arr].length){
      i=0;
      arr+=1;
      if(arr == text.length){
        arr = 0;
      }
      setTimeout(()=>this.arrayTypeWriter(text,elementId,i,arr),1000);
      return
      console.log(i);
    }
    if(i<text[arr].length){
      setTimeout(()=>this.arrayTypeWriter(text,elementId,i,arr),120);
    }
  }
  scrollListener(){
    fromEvent(window,'scroll').subscribe((ev)=>{
      console.log("Scrolled");

    })
  }

}
