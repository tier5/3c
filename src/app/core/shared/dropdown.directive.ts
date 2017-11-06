import { Directive, HostBinding, HostListener } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor() { }

  @HostListener('click') toggle () {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseover') toggleOpen () {
    this.isOpen = true;
  }

  @HostListener('mouseout') toggleClose () {
    this.isOpen = false;
  }
}
