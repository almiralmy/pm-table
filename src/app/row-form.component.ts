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
  wbscode:HTMLInputElement;
  submitted = false;

  constructor(private rowService: RowService){
    rowService.newRowEnded$.subscribe(
      numRows => {
        //Gestione aggiunta nuova riga
        console.log("Num rows totale: " + numRows);
        //Pulizia finestra e salvataggio totale righe
        this.numRows = numRows;
        
        wbscode.value = "";
        description.value="";
        pv.value=0;
        progress.value=0;
        //console.log("numrighe: " + this.numRows);
      });
  }

  onSubmit(wbscode, description, pv, progress, rowindex) {
    this.submitted = true;
    console.log("Submitting form");
    console.log(wbscode + "-" + description + "-" + pv + "-" + progress + "-" + rowindex);
    this.newRow(wbscode, description, pv, progress, rowindex);
    //this.reset();
  }

  newRow(wbscode, description, pv, progress, rowindex):void {
    this.rowService.addNewRow([wbscode, description, pv, progress, rowindex]);
    console.log("New row addition");
  }
}
