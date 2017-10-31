import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  /** Variable declaration */
  @Input('appDropdown') dd: string;
  @Input('disable-hover') dh: boolean = false;
  clicked: boolean = false;

  /** Service injection */
  constructor(private renderer: Renderer2,
              private el: ElementRef) { }

  /** Function to be executed on mouse click */
  @HostListener('click') toggle () {
    if (this.el.nativeElement.classList.contains(this.dd)) {
      this.renderer.removeClass(this.el.nativeElement, this.dd);
      this.clicked = true;
    } else {
      this.renderer.addClass(this.el.nativeElement, this.dd);
      this.clicked = false;
    }
  }

  /** Function to be executed on mouse hover in */
  @HostListener('mouseover') toggleOpen () {
    if(!this.dh) {
      this.renderer.addClass(this.el.nativeElement, this.dd);
    }
  }

  /** Function to be executed on mouse hover out */
  @HostListener('mouseout') toggleClose () {
    if (!this.dh) {
      if (!this.clicked) {
        this.renderer.removeClass(this.el.nativeElement, this.dd);
      }
      this.renderer.removeClass(this.el.nativeElement, this.dd);
      }
    }

}
