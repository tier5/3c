import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs/Subscription';
import { Spinner } from 'spin.js';

@Component({
  selector: 'sjs-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  private spinner: any;
  private show = false;
  private element: any = null;
  private subscription: Subscription = null;

  @Input() lines = 13; // The number of lines to draw
  @Input() length = 38; // The length of each line
  @Input() width = 17; // The line thickness
  @Input() radius = 45; // The radius of the inner circle
  @Input() scale = 1; // Scales overall size of the spinner
  @Input() corners = 1; // Corner roundness (0..1)
  @Input() color = '#ffffff'; // #rgb or #rrggbb or array of colors
  @Input() fadeColor = 'transparent'; // CSS color or array of colors
  @Input() opacity = 0.25; // Opacity of the lines
  @Input() rotate = 10; // The rotation offset
  @Input() direction = 1; // 1: clockwise, -1: counterclockwise
  @Input() speed = 1; // Rounds per second
  @Input() trail = 60; // Afterglow percentage
  @Input() fps = 20; // Frames per second when using setTimeout() as a fallback for CSS
  @Input() className = 'spinner'; // The CSS class to assign to the spinner
  @Input() top = '50%'; // Top position relative to parent
  @Input() left = '50%'; // Left position relative to parent
  @Input() shadow = '0 0 1px transparent'; // Whether to render a shadow
  @Input() hwaccel = true; // Whether to use hardware acceleration
  @Input() position = 'absolute'; // Element positioning
  constructor(private spinnerElement: ElementRef,
              private spinnerService: SpinnerService) {
    this.element = spinnerElement.nativeElement;
  }

  ngOnInit() {
    // this.initSpinner();
    this.createServiceSubscription();
  }

  private initSpinner() {
    const options = {
      lines: this.lines,
      length: this.length,
      width: this.width,
      radius: this.radius,
      scale: this.scale,
      corners: this.corners,
      color: this.color,
      opacity: this.opacity,
      rotate: this.rotate,
      direction: this.direction,
      speed: this.speed,
      trail: this.trail,
      fps: this.fps,
      zIndex: 2e9, // Artificially high z-index to keep on top
      className: this.className,
      top: this.top,
      left: this.left,
      shadow: this.shadow,
      hwaccel: this.hwaccel,
      position: this.position
    };
    this.spinner = new Spinner(options);
  }

  private createServiceSubscription() {
    this.subscription = this.spinnerService.spinnerObservable.subscribe(show => {
      if (show) {
        this.startSpinner();
      } else {
        this.stopSpinner();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startSpinner() {
    this.show = true;
     // this.spinner.spin(this.element.firstChild);
  }

  stopSpinner() {
    this.show = false;
    // this.spinner.stop();
  }
}
