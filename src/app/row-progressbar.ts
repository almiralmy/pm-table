import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'row-progressbar',
  templateUrl: './row-progressbar.html'
})
export class RowProgressbarComponent implements OnInit {
  @Input() dynamic:number;
  @Input() enabled:boolean;
  public max: number = 100;
  public showWarning: boolean;
  //public dynamic: number;
  public type: string;

  public constructor() {

  }

  ngOnInit():void {
    if (this.enabled){
      this.type='success';
    } else {
      this.type='info';
    }
  }

}
