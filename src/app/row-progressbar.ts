import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'row-progressbar',
  templateUrl: './row-progressbar.html'
})
export class RowProgressbarComponent implements OnInit, OnChanges {
  //AfterViewChecked,
  @Input() dynamic:number;
  @Input() enabled:boolean;
  //@ViewChild('progressbarelement') barComponent: ElementRef;
  public max: number = 100;
  public showWarning: boolean;
  //public dynamic: number;
  public type: string;

  public constructor() {
    //Nothing to do
  }

  ngOnInit():void {
    //Nothing to do
    //this.type="success";
  }

  ngOnChanges(changes: SimpleChanges):void {
    //console.log('currValue: ' + changes['dynamic'].currentValue);
    if(changes['dynamic']) {
      if (this.enabled){
        switch(Number(changes['dynamic'].currentValue)) {
          case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:
            this.type='success0';
            break;
          case 10:case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:
            this.type='success1';
            break;
          case 20:case 21:case 22:case 23:case 24:case 25:case 26:case 27:case 28:case 29:
            this.type='success2';
            break;
          case 30:case 31:case 32:case 33:case 34:case 35:case 36:case 37:case 38:case 39:
            this.type='success3';
            break;
          case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 48:case 49:
            this.type='success4';
            break;
          case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 58:case 59:
            this.type='success5';
            break;
          case 60:case 61:case 62:case 63:case 64:case 65:case 66:case 67:case 68:case 69:
            this.type='success6';
            break;
          case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:
            this.type='success7';
            break;
          case 80:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:
            this.type='success8';
            break;
          case 90:case 91:case 92:case 93:case 94:case 95:case 96:case 97:case 98:case 99:
            this.type='success9';
            break;
          case 100:
            this.type='success10';
            break;
          }
      } else {
        this.type='info';
      }
    }
  }

  /*ngAfterViewChecked(): void {
    if (this.enabled){
      console.log("dynamic: " + this.dynamic);
      switch(this.dynamic) {
        case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:
          this.type='success0';
          break;
        case 10:case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:
          this.type='success1';
          break;
        case 20:case 21:case 22:case 23:case 24:case 25:case 26:case 27:case 28:case 29:
          this.type='success2';
          break;
        case 30:case 31:case 32:case 33:case 34:case 35:case 36:case 37:case 38:case 39:
          this.type='success3';
          break;
        case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 48:case 49:
          this.type='success4';
          break;
        case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 58:case 59:
          this.type='success5';
          break;
        case 60:case 61:case 62:case 63:case 64:case 65:case 66:case 67:case 68:case 69:
          this.type='success6';
          break;
        case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:
          this.type='success7';
          break;
        case 80:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:
          this.type='success8';
          break;
        case 90:case 91:case 92:case 93:case 94:case 95:case 96:case 97:case 98:case 99:
          this.type='success9';
          break;
        case 100:
          this.type='success10';
          break;
      }
      //this.type='success0';
    } else {
      this.type='info';
    }
  }*/

}
