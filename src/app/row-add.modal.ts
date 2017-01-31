import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RowFormComponent } from './row-form.component';

@Component({
  selector: 'row-add',
  templateUrl: './row-add.modal.html'
})
export class RowAddModalComponent implements OnInit {
  @Input() actualrows:Array<Object>;
  @ViewChild('staticModal') modal: ElementRef;

  constructor() {
  }

  ngOnInit():void {
    console.log(this.actualrows);
  }

  closeDialog(event){
    console.log("evento: " + event + " - chiudere modale");
    //this.isOpen = false;
    this.modal.hide();
  }


}
