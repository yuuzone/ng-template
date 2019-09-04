import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'layout-default',
    templateUrl: './default.component.html',
})
export class LayoutDefaultComponent implements OnInit {

    routeUrl: string;
    constructor(
    ) { 
    }

    ngOnInit() {
        
    }
}
