import { SavedCodeService } from 'src/app/services/saved-code.service';
import { CodeTypes } from './../../models/codeTypes';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowSavedCodeDto } from 'src/app/models/showSavedCodeDto';
declare var $: any;
declare var monaco: any;
@Component({
  selector: 'app-tryweb',
  templateUrl: './tryweb.component.html',
  styleUrls: ['./tryweb.component.css'],
})
export class TrywebComponent implements OnInit,AfterViewInit {
  frame: HTMLIFrameElement;
  sliding: boolean = false;
  monacoEditor: any;
  defaultHTML = '';
  monacoOptions: any = {
    value: this.defaultHTML,
    automaticLayout: true,
    language: 'html',
    minimap: { enabled: false },
    theme: 'vs-dark',
  };
  codeTypes: { id: number, name: string, editor: string, preview: string, beginCode?: string }[];
  frameConsole: any;
  currentSelected: number = 0;
  selectedType: { id: number, name: string, editor: string, preview: string, beginCode?: string } = { id: 0, name: "HTML", editor: "html", preview: "html", beginCode: "<!DOCTYPE html>\n<html>\n<body>\n\n</body>\n</html>" };
  savedStates: { editorType: number, code: string }[];
  allowRun: boolean = true;
  savedCodeId?: string = undefined;
  savedCode: ShowSavedCodeDto;
  viewInit:boolean = false;
  constructor(private savedCodeService: SavedCodeService, private activatedRoute: ActivatedRoute) { }
  ngAfterViewInit(): void {
    this.viewInit = true;
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param['code'] != undefined) {
        this.savedCodeId = param['code'];
        console.log(this.savedCodeId);
      }
    })
    this.codeTypes = CodeTypes;

    this.frame = document.getElementById('iframeContent') as HTMLIFrameElement;
    this.initializeElements();
    if(this.savedCodeId != undefined){
      this.loadSavedCode();
    }else{
      this.loadEmptyTryweb();
    }
    $(this.frame).contents().find('body').html();

    this.frameConsole = $(this.frame).get(0).contentWindow.console;
    this.getConsoleActivity();
  }
  initializeDropdown(){
    setTimeout(() => {
      $('.ui.search.selection.dropdown').dropdown();
    }, 1000);
  }
  loadEmptyTryweb() {
    this.initializeEditor(0);
  }
  loadSavedCode() {
    let id = parseInt(this.savedCodeId ?? "");
    this.savedCodeService.getSavedCodeById(id).subscribe({
      next: (response) => {
        let selectEl = document.getElementById("languageSelector") as HTMLSelectElement;
        selectEl.selectedIndex = response.data.codeType;
        selectEl.disabled = true;
        this.currentSelected = response.data.codeType;
        this.savedCode = response.data;
        this.initializeEditor(this.currentSelected,response.data.codeText);
      },
      error: (err) => {

      }
    })
  }
  initializeElements() {
    let left = document.getElementsByClassName('left-panel')[0] as HTMLElement;
    let bar = document.getElementsByClassName(
      'tryweb-slider'
    )[0] as HTMLElement;
    let container = document.getElementsByClassName(
      'tryweb-container'
    )[0] as HTMLElement;
    const drag = (e: any) => {
      document.getSelection()
        ? document.getSelection
        : window.getSelection()?.removeAllRanges();
      left.style.width = e.pageX - bar.offsetWidth / 2 + 'px';
    };
    bar.addEventListener('mousedown', () => {
      this.sliding = true;
      container.addEventListener('mousemove', drag);
    });

    bar.addEventListener('mouseup', () => {
      this.sliding = false;
      container.removeEventListener('mousemove', drag);
    });
  }
  saveCurrentCode() {
    if (this.monacoEditor === undefined) {
      return;
    }
    if (this.savedStates === undefined) {
      this.savedStates = [];
    }
    let currentCode = { editorType: this.currentSelected, code: (this.monacoEditor.getValue()) };
    if (this.savedStates.find(x => x.editorType == this.currentSelected) === undefined) {
      this.savedStates.push(currentCode);
    } else {
      let ref = this.savedStates.find(x => x.editorType == this.currentSelected)
      if (ref !== undefined) {
        ref.code = this.monacoEditor.getValue();
      }
    }
  }
  initializeEditor(id: number = 0, initial:string = "") {
    this.saveCurrentCode();
    this.allowRun = this.codeTypes.find(x => x.id == id)?.preview != "none" ? true : false;
    let initCode = "";
    if (this.savedStates !== undefined && this.savedStates.find(x => x.editorType == id) !== undefined) {
      if (this.savedStates.find(x => x.editorType == id)?.code !== undefined) {
        initCode = this.savedStates.find(x => x.editorType == id)?.code ?? "";
      }
    }
    this.selectedType = this.codeTypes.find(x => x.id == id) ?? this.selectedType;
    console.log("initCode : " + initCode)
    if (initCode == "") {
      initCode = this.codeTypes.find(x => x.id == id)?.beginCode ?? "";
    }
    if (initial != "") {
      initCode = initial
    }
    this.monacoOptions.value = initCode;
    this.monacoOptions.language = this.codeTypes[id].editor;
    let monacoElement = document.getElementsByClassName('monaco-editor')[0];
    if (this.monacoEditor !== undefined) {
      this.monacoEditor.dispose();
    }
    this.monacoEditor = monaco.editor.create(monacoElement, this.monacoOptions);
    this.currentSelected = id;
    this.initializeDropdown();
  }
  changeCodeType(ev: any) {
    console.log(ev.target.value);
    this.initializeEditor(ev.target.value)
  }
  preview() {
    this.frameConsole.everything = [];
    let val = this.monacoEditor.getValue();
    if (this.selectedType.preview == "html") {
      $(this.frame).contents().find('body').html(val);
    } else if (this.selectedType.preview == "console") {
      console.log("pushed");
      $(this.frame).contents().find('body').html('<script>' + val + '</script>');
    }


  }
  zoomIn() {
    const action = this.monacoEditor.getAction('editor.action.fontZoomIn');
    if (action.isSupported()) {
      action.run();
    }
  }
  zoomOut() {
    const action = this.monacoEditor.getAction('editor.action.fontZoomOut');
    if (action.isSupported()) {
      action.run();
    }
  }
  getConsoleActivity() {
    let console = this.frameConsole;
    if (console.everything === undefined) {
      console.everything = [];

      console.defaultLog = console.log.bind(console);
      console.log = function () {
        console.everything.push({
          type: 'log',
          datetime: Date().toLocaleString(),
          value: Array.from(arguments),
        });
        console.defaultLog.apply(console, arguments);
      };
      console.defaultError = console.error.bind(console);
      console.error = function () {
        console.everything.push({
          type: 'error',
          datetime: Date().toLocaleString(),
          value: Array.from(arguments),
        });
        console.defaultError.apply(console, arguments);
      };
      console.defaultWarn = console.warn.bind(console);
      console.warn = function () {
        console.everything.push({
          type: 'warn',
          datetime: Date().toLocaleString(),
          value: Array.from(arguments),
        });
        console.defaultWarn.apply(console, arguments);
      };
      console.defaultDebug = console.debug.bind(console);
      console.debug = function () {
        console.everything.push({
          type: 'debug',
          datetime: Date().toLocaleString(),
          value: Array.from(arguments),
        });
        console.defaultDebug.apply(console, arguments);
      };
    }
  }
}
