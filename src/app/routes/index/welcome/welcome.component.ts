import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'index-welcome',
    templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit, AfterViewInit {

    welcome: string = '欢迎光临'

    @ViewChild('editor', {static: false}) editor;

    text:string = 'qqw\nqw\nsdf\nsdf';
    options:any = {maxLines: 1000, printMargin: false};
    
    constructor() { }

    ngOnInit() {
        console.log('这里是WelcomeComponent ngOnInit = ' + navigator.userAgent);
    }
    
    ngAfterViewInit() {
        this.editor.setTheme("eclipse");
 
        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true
        });
 
        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {
 
            }
        })
    }

    onChange(code) {
        
        const array = code.trim().split('\n');
        console.log(array);
    }
}
