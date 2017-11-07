import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @Input('appDropdown') dd: string;
  @Input('disable-hover') dh: boolean = false;

  clicked: boolean = false;

  constructor(private renderer: Renderer2,
              private el: ElementRef) { }

  @HostListener('click') toggle () {
    if (this.el.nativeElement.classList.contains(this.dd)) {
      this.renderer.removeClass(this.el.nativeElement, this.dd);
      this.clicked = true;
    } else {
      this.renderer.addClass(this.el.nativeElement, this.dd);
      this.clicked = false;
    }
  }

  @HostListener('mouseover') toggleOpen () {
    if(!this.dh) {
      this.renderer.addClass(this.el.nativeElement, this.dd);
    }
  }

  @HostListener('mouseout') toggleClose () {
    if (!this.dh) {
      if (!this.clicked) {
        this.renderer.removeClass(this.el.nativeElement, this.dd);
      }
      this.renderer.removeClass(this.el.nativeElement, this.dd);
      }
    }

}
