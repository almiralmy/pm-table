import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Row }    from './row';
import { RowService } from './row.service';

@Component({
  //moduleId: module.id,
  selector: 'row-form',
  templateUrl: 'row-form.component.html'
})
export class RowFormComponent {
  @Input() actualrows:Array<Object>;
  @Output() closeDialog: EventEmitter<string> = new EventEmitter();
  numRows: number;
  submitted = false;

  constructor(private rowService: RowService){
    console.log(this.actualrows);
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
        rowindex.value="nowbscode";

        this.submitted=false;

        /*
        function successRegistrationContact() {
			       $("form[name=registration-contact]").append('<div class="form-successo"><i class="fa fa-check"></i>La registrazione &egrave stata eseguita con successo.</div>').queue(function(next) {
				           //$('.form-successo').fadeOut(3000);
				               //$(next).dequeue();
			       });
			       return true;
		   }
       */
        //console.log(rowaddedsuccess);
        //console.log(rowaddeddanger);
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

  sendForm(wbscode, description, pv, progress, rowindex) {
    this.newRow(wbscode, description, pv, progress, rowindex);
    //Event emitter to close dialog
    this.closeDialog.emit('closeModal');
  }

  closeModal():void {
    this.closeDialog.emit('closeModal');
  }

  newRow(wbscode, description, pv, progress, rowindex):void {
    this.rowService.addNewRow([wbscode, description, pv, progress, rowindex]);
    //console.log("New row addition");
  }
}
