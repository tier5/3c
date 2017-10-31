import { Component } from '@angular/core';

@Component({
  selector: 'app-layout.component.ts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  /** Variable declaration */
  hovered: boolean = false;
  mobileViewClicked: boolean = false;

  constructor() { }

  /** Function to toggle sidebar in desktop view */
  toggleLeftSidebar($event){
    if ($event.type == 'click') {
      this.hovered = !this.hovered;
    } else {
      this.hovered = $event.type == 'mouseover';
    }
  }

  /** Function to toggle sidebar in mobile view */
  toggleLeftSidebarMobile($event) {
    if ($event.type == 'click') {
      this.mobileViewClicked = !this.mobileViewClicked;
    }
  }

}
