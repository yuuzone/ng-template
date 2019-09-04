import { Component, OnInit } from '@angular/core';
import { routeAnimation } from './animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  animations: [routeAnimation]
})
export class AppComponent implements OnInit {
  title = 'ngExample';

  routerState: boolean = true;
  routerStateCode: string = 'active';
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 每次路由跳转改变状态
        this.routerState = !this.routerState;
        this.routerStateCode = this.routerState ? 'active' : 'inactive';
      }
    });
  }

  ngOnInit() {
    console.log('这里是AppComponent ngOnInit = ' + navigator.userAgent);
  }
}
