import { Component } from '@angular/core';

@Component({
  selector: 'row-progressbar',
  templateUrl: './row-progressbar.html'
})
export class RowProgressbarComponent {
  public max: number = 100;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;

  public constructor() {
    this.dynamic = 30;
    this.type="success";
    this.max = 100;
  }

  public random(): void {
    let value = Math.floor((Math.random() * 100) + 1);
    let type: string;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.showWarning = (type === 'danger' || type === 'warning');
    this.dynamic = value;
    this.type = type;
  }

}
