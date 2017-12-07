import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoScrollDirective } from './auto-scroll.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    AutoScrollDirective
  ],
  exports: [
    DropdownDirective,
    AutoScrollDirective
  ]
})
export class SharedModule { }
