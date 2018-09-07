import { Component } from '@angular/core';

import { SpinnerService } from './core/shared/spinner';

@Component({
  selector: 'app-root',
  template: `<app-core></app-core>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private spinnerService: SpinnerService) {
  }

  title = 'app';
}
