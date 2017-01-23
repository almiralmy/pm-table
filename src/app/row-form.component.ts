import { Component } from '@angular/core';
import { Row }    from './row';
import { RowService } from './row.service';

@Component({
  //moduleId: module.id,
  selector: 'row-form',
  templateUrl: 'row-form.component.html'
})
export class RowFormComponent {

  numRows: number;

  constructor(private rowService: RowService){
    rowService.newRowEnded$.subscribe(
      numRows => {
        //Gestione aggiunta nuova riga
        console.log("Num rows totale: " + numRows);
        //Pulizia finestra e salvataggio totale righe
        this.numRows = numRows;
      });
  }

  //powers = ['Really Smart', 'Super Flexible',
  //          'Super Hot', 'Weather Changer'];
  //model = new Row(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit(wbscode, description, pv, progress, rowindex) {
    this.submitted = true;
    console.log("Submitting form");
    console.log(wbscode + "-" + description + "-" + pv + "-" +progress + "-" + rowindex);
    this.newRow(wbscode, description, pv, progress, rowindex);
  }
  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

  newRow(wbscode, description, pv, progress, rowindex):void {
    this.rowService.addNewRow([wbscode, description, pv, progress, rowindex]);
    console.log("New row addition");
  }
}
