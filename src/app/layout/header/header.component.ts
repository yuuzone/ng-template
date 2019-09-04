import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleCollapsedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  isCollapsed = false;
  constructor(
  ) { }

  ngOnInit() {
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleCollapsedEvent.emit(this.isCollapsed);
  }

}
