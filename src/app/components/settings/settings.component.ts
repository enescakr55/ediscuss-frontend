import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:{key:string,value:string,icon:string}[] = [
    {key:"account",value:"Hesap Ayarları",icon:"teal user circle icon"},
    {key:"privacy",value:"Gizlilik Ayarları",icon:"teal lock icon"},
    {key:"preferences",value:"Tercihler",icon:"teal wrench icon"}
  ]
  paramKey:string;
  selectedSetting:string | undefined= "";
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      this.paramKey = param['key']
      this.selectedSetting = this.settings.find(x=>x.key == this.paramKey)?.value
    })
  }

}
