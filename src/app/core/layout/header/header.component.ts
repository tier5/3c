import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() tls: EventEmitter<any> = new EventEmitter();
  @Output() mtls: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleLeftSidebar() {
    if(window.screen.width <= 767) {
      this.mtls.emit(event);
    } else {
      this.tls.emit(event);
    }
  }

}
