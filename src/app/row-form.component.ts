import { Component } from '@angular/core';
import { Row }    from './row';
import { RowService } from './row.service';

@Component({
  //moduleId: module.id,
  selector: 'row-form',
  templateUrl: 'row-form.component.html'
})
export class RowFormComponent {

  constructor(private rowService: RowService){}

  //powers = ['Really Smart', 'Super Flexible',
  //          'Super Hot', 'Weather Changer'];
  //model = new Row(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit(wbscode, description, pv, progress) {
    this.submitted = true;
    console.log("Submitting form");
    console.log(wbscode + "-" + description + "-" + pv + "-" +progress);
    this.newRow(wbscode, description, pv, progress);
  }
  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

  newRow(wbscode, description, pv, progress):void {
    this.rowService.addNewRow([wbscode, description, pv, progress]);
    console.log("New row addition");
  }
}
