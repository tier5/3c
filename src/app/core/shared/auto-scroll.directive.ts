import { AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appAutoScroll]'
})
export class AutoScrollDirective implements AfterContentInit {

  @Input("scrollDown") scrollDown: boolean = true;

  private nativeElement: HTMLElement;

  constructor(private el: ElementRef,
              private renderer: Renderer2,) {
    this.nativeElement = el.nativeElement;
  }

  public ngAfterContentInit(): void {
    console.log('scrollTop', this.nativeElement.scrollTop);
    console.log('clientHeight', this.nativeElement.clientHeight);
    console.log('scrollHeight', this.nativeElement.scrollHeight);
    console.log(this.nativeElement);
    this.adjust();
  }

  adjust() {
    if(this.scrollDown) {
      this.nativeElement.scrollTop = this.nativeElement.scrollHeight - this.nativeElement.clientHeight;
    } else {
      if (this.nativeElement.scrollTop + this.nativeElement.clientHeight > this.nativeElement.scrollHeight) {
        console.log('true');
        //this.renderer.
        this.nativeElement.scrollTop = this.nativeElement.scrollHeight;
      }
    }
  }

  @HostListener('window:scroll') scrollEvent () {
    console.log('scrollTop', this.nativeElement.scrollTop);
    console.log('clientHeight', this.nativeElement.clientHeight);
    console.log('scrollHeight', this.nativeElement.scrollHeight);
  }

}
