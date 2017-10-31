import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoScrollDirective } from './auto-scroll.directive';
import { DropdownDirective } from './dropdown.directive';
import { SpinnerComponent } from './spinner';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    AutoScrollDirective,
    SpinnerComponent
  ],
  exports: [
    DropdownDirective,
    AutoScrollDirective,
    SpinnerComponent
  ]
})
export class SharedModule { }
