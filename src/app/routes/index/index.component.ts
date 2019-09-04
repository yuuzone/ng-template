import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
