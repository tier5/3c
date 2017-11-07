import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout.component.ts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  hovered:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleLeftSidebar($event){
    if ($event.type == 'click') {
      this.hovered = !this.hovered;
    } else {
      this.hovered = $event.type == 'mouseover';
    }
  }

}
