import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


  @Input('color') color:string="#ec045b";
  @Input('type') type:string="danger";
  @Input('text') text:string="Alert";
  show: boolean = false;
  font: string = '#ececec';
  opacity: number = 0;

  public alertHidden:boolean=true;

  ngOnInit(){
    setTimeout(() => {
      this.show = true;
      setInterval(() => {
        this.opacity+=0.1;
      },70)
    },500);
  }

  dismiss(){
    this.show = false;
  }

}
